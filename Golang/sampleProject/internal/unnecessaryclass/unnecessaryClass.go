package unnecessaryclass

type ActivityStruct struct {
	ambatu string
	scream string
}

func (as *ActivityStruct) GetAmbatu() string {
	return as.ambatu
}

func (as *ActivityStruct) GetScream() string {
	return as.scream
}

func (as *ActivityStruct) SetAmbatu(ambatu string) {
	as.ambatu = ambatu
}

func (as *ActivityStruct) SetScream(scream string) {
	as.scream = scream
}
