package main

import (
	
	"fmt"
	"strconv"
	"time"

	"github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"

	gowebly "github.com/gowebly/helpers"
)



// runServer runs a new HTTP server with the loaded environment variables.
func runServer() error {
	// Validate environment variables.
	port, err := strconv.Atoi(gowebly.Getenv("BACKEND_PORT", "7000"))
	if err != nil {
		return err
	}

	// Create a new PocketBase server.
	app := pocketbase.New()

	// Add PocketBase onBeforeServe middleware.
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		

		// Add Echo middlewares.
		e.Router.Use(middleware.Logger())

		// Handle static files.
		e.Router.Static("/static", "./static")

		// Handle index page view.
		e.Router.GET("/", indexViewHandler)

		// Handle API endpoints.
		e.Router.GET("/api/hello-world", showContentAPIHandler)

		// Set server options from environment variables.
		// For more information, see https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/
		e.Server.Addr = fmt.Sprintf(":%d", port)
		e.Server.ReadTimeout = 5 * time.Second
		e.Server.WriteTimeout = 10 * time.Second

		return nil
	})

	return app.Start()
}
