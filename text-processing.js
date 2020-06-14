// Text-Processing API Url
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://japerk-text-processing.p.rapidapi.com/sentiment/",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "japerk-text-processing.p.rapidapi.com",
		"x-rapidapi-key": "fa1d503551mshdc9c6bf723dcd26p1a6222jsn874f5aaf221e",
		"content-type": "application/x-www-form-urlencoded"
	},
	"data": {
		"language": "english",
		"text": "great movie"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

// Button click handler
const onAnalyzeButtonClick = () => {
  // Getting a textarea element with a comment
  const commentElement = document.getElementById('comment');
  // Getting comment text
  const commentText = commentElement.value.trim();

  // Handle empty comment
  if (!commentText) {
          return handleEmptyComment();
  }
  // Calling the API and passing the result with the displayResult as a callback function
  return analyzeComment(commentText, displayResult);
};

const analyzeComment = (comment, callback) => {
  // Creating an object to send to the server
  const data = {
          text: comment
          , language: 'english'
  };
  // Encoding data for application/x-www-form-urlencoded content type
  const formattedData = Qs.stringify(data);
  // POST request to server
  axios.post(API_URL, formattedData, { headers: REQUEST_HEADERS })
          .then(response => {
            const data = response.data;
            // Calling a callback function with data from the server
            callback(data)
          })
          .catch(error => console.error(error))
};

const handleEmptyComment = () => {
  const resultBlockElement = document.getElementById('main-result-block');
  resultBlockElement.classList.add('invisible');
  return alert('Your comment is empty =(');
};

const displayResult = result => {
  // Remove invisible class for main-result-block
  const resultBlockElement = document.getElementById('main-result-block');
  resultBlockElement.classList.remove('invisible');

  // Setting the color of the result text depending on the response label
  const label = result.label;
  const resultElement = document.getElementById('result');
  resultElement.setAttribute('class', label);
  let resultText = '';

  // Choosing the result text depending on response label
  switch (label) {
      case 'pos':
          resultText = 'Wow! Your comment is very positive!';
          break;
      case 'neg':
          resultText = 'Negative comment =(';
          break;
      case 'neutral':
          resultText = 'Simple comment =)';
          break;
      default:
          resultText = 'Hmmm, can't understand your comment';
  }

  // Setting the result text
  resultElement.textContent = resultText;
};