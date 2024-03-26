package main

import (

	//	"math"

	"net/http"

	"github.com/gin-gonic/gin"
	//	"golang.org/x/crypto/bcrypt"
	//	"github.com/360EntSecGroup-Skylar/excelize"
	//	"log"
	//	"context"
	//	"strings"
	//	"strconv"
	//	"github.com/pbnjay/strptime"
	//	"go.mongodb.org/mongo-driver/bson"
	//	"go.mongodb.org/mongo-driver/mongo"
	//	"go.mongodb.org/mongo-driver/mongo/options"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Static("/static_cv", "./static")
	r.LoadHTMLGlob("templates/*")

	r.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	//r.GET("/", func(c *gin.Context) {
	//	c.Redirect(http.StatusFound, "/cv_genomexyz/index")
	//})

	r.GET("/index", func(c *gin.Context) {
		var iter_box []int
		for i := 0; i < 3200; i++ {
			iter_box = append(iter_box, i+1)
		}
		c.HTML(http.StatusOK, "index.html", gin.H{"iter_life_box": iter_box})
	})

	return r
}

func main() {
	r := setupRouter()
	r.Run(":9876")
}
