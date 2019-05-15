const apiKey = 'bYN4vTcqa58YoPBDURrdW4K0IspZ8z7TXG2uTeEG';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
  }
  
  
  function getParkByState(state) {
    const params = {
        stateCode: state,
        api_key: apiKey
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#search').val();
    //   const maxResults = $('#max-results').val();
      getParkByState(searchTerm);
    });
  }
  $(watchForm);