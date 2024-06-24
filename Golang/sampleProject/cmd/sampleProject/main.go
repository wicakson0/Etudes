package main

import (
	"fmt"

	"github.com/wicakson0/sampleProject/internal/unnecessaryclass" // Corrected import path
)

func main() {
	fmt.Println("Hello Sir")
	ambatukam := unnecessaryclass.ActivityStruct{} // Corrected struct instantiation
	ambatukam.SetAmbatu("AMBATUKAM")               // Example of setting values
	ambatukam.SetScream("OOOOOOHHHH!!!!!!")
	fmt.Println(ambatukam.GetAmbatu() + " " + ambatukam.GetScream())
}
