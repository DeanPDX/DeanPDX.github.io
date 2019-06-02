---
layout: post
title:  "Serving Static Content Using Golang HTTP"
date:   2019-06-02 11:47:26
excerpt: "A quick and easy tutorial on how to serve protected static content via Golang."
featured_image: /images/2019-go-static-example/featured-image.png
---

I maintain a golang API for a client, and the need arose to serve static content based on certain criteria, depending on who was requesting the content. I found [this article](https://mrwaggel.be/post/golang-transmit-files-over-a-nethttp-server-to-clients/) and started implemented something similar before realizing that it was madness to do it this way when `net/http` has a function for serving static content called [ServeFile](https://golang.org/pkg/net/http/#ServeFile). Here's an example implementation:

```golang
package main

import (
	"fmt"
	"net/http"
	"path"
	"path/filepath"
	"strings"
)

func main() {
	port := ":4300"
	fmt.Println("Listening on", port)
	fmt.Println("Serving static content from the /files/ directory.")
	http.HandleFunc("/files/", HandleFiles)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println(err)
	}
}

// HandleFiles handles static content.
func HandleFiles(w http.ResponseWriter, r *http.Request) {
	// Get only the file name.
	Filename := path.Base(r.URL.String())
	// Whatever arbitrary logic you want. For demo purposes, we will not serve
	// content that contains the string "bad". But you could be checking that
	// the user is the owner of this file, or any additional checks you aren't
	// doing in your middleware.
	if strings.Contains(Filename, "bad") {
		fmt.Println("This file is bad and we won't serve it:", Filename)
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte("Not authorized!"))
		return
	}
	fmt.Println("Attempting to serve", Filename)
	// Use http.ServeFile to serve the content. We don't have to worry about
	// writing not found HTTP error codes, etc., because ServeFile handles it
	// for us.
	http.ServeFile(w, r, filepath.Join(".", "files", Filename))
}
```

That's it. Here's an example of output from me running this with files named `good.txt` and `bad.txt` in my `/files` directory. I downloaded `good.txt`, attempted to get `bad.txt`, and then tried to get `notfound.txt`:

```
Listening on :4300
Serving static content from the /files/ directory.
Attempting to serve good.txt
This file is bad and we won't serve it: bad.txt
Attempting to serve notfound.txt
```

## What About HTTP Headers?

When serving a file, we have the headers we expect. For example, here are the headers for `good.txt`:

```http
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 9
Content-Type: text/plain; charset=utf-8
Last-Modified: Sun, 02 Jun 2019 19:20:27 GMT
Date: Sun, 02 Jun 2019 19:30:43 GMT
```

## Conclusion
In summary: just use `http.ServeFile`. I created a [repository with this demo app](https://github.com/DeanPDX/go-http-static-example) if you want to run it yourself.