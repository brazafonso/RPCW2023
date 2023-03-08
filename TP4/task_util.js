exports.valid_task = function(dict){
  let reDate = RegExp('\\d{4}-\\d{2}-\\d{2}')
  return 'who' in dict && 'what' in dict && 'deadline' in dict && dict['deadline'].match(reDate)
}



exports.sleep = function(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}