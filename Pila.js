class Pila{

	constructor(){this.array = [];}

	Stack(A){this.array.push(A);}

	Pop(){this.array.pop();}

	Peek(){return this.array[this.array.length-1];}

	Print(){return this.array;}

	Size(){return this.array.length;}
}