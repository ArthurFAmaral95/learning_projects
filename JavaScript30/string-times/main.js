//gets all tags with data-time
//result would be a node list
//Array.from turns into an array
const timeNodes = Array.from(document.querySelectorAll('[data-time]'))

const seconds = timeNodes
  //gets all nodes and return the value of data-time of each node
  .map(node => node.dataset.time)
  .map(timeCode => {
    //gets the value of each node data-time atribute and split it at :
    //since it is a string, we use parseFloat to turn each value into a number
    //get these numbers and assign them to minutes and seconds
    const [mins, secs] = timeCode.split(':').map(parseFloat)
    //sum up the total of seconds for each node
    return mins * 60 + secs
  })
  //sum up the total of seconds of all videos
  .reduce((total, vidSeconds) => total + vidSeconds)

let secondsLeft = seconds
//calculate how many complete hours there are
const hours = Math.floor(secondsLeft / 3600)
//calculate how many seconds are left after take out the hours
secondsLeft = secondsLeft % 3600
//calculate how many complete minutes there are
const minutes = Math.floor(secondsLeft / 60)
//calcultate how many seconds are left after take out the minutes and hours
secondsLeft = secondsLeft % 60

console.log(hours, minutes, secondsLeft)
