class Cola{

	constructor(){this.array = [];}

	Enqueue(A){this.array.push(A);}

	Dequeue(){this.array.shift();}

	Peek(){return this.array[0];}

	Print(){return this.array;}

	Size(){return this.array.length;}
}