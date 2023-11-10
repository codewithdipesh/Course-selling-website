interface Circle{
    radius:number
}
interface Square{
    side:number
}
interface Rectangle{
    width:number;
    height:number
}

type shape = Rectangle | Square | Circle

function renderShape (shape:shape){
    console.log("rendereed")
}

renderShape({
    side:12
})