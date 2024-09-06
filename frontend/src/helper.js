const randomGradient =() =>{
  const randomColor = () => Math.floor(Math.random() * 255);
  const color1 = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`;
  const color2 = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`;
  return `linear-gradient(to top right, ${color1}, ${color2})`;
}
export {randomGradient}
