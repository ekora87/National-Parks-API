'use strict';

const apiKey = 'bYN4vTcqa58YoPBDURrdW4K0IspZ8z7TXG2uTeEG';
const searchURL = 'https://developer.nps.gov/api/v1/parks';
let dropDown = '';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
  }
  
  
function getParkByState(query, maxResults=10) {
  const searchBy = dropDownMenuOptions();
  let params={};
  if (searchBy === "Search By State") {
    params = {
      stateCode: query,
      api_key: apiKey,
      limit: maxResults - 1
    };
  } else {
    params = {
      q: query,
      api_key: apiKey,
      limit: maxResults - 1
    };
  }
  const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson.data))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong. ${err.message}`);
    });
}

//retrieve user search inputs
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.result-container').empty();
    const searchTerm = $('#search').val();
    const maxResults = $('#max-results').val();
    getParkByState(searchTerm, maxResults);
    $('form').children('#search').val('');
  });
}

//display the search results to the DOM
function displayResults(responseJson) {
  for (let i=0; i<responseJson.length; i++) {
    $('.result-container').append(
      `<div class="each-result">
       <ul class="result-list">
       <li><h3>${responseJson[i].name}</h3></li>
       <li>Description: ${responseJson[i].description}</li>
       <li><a class="park-url" href="${responseJson[i].url}" target="_blank">Park's Website</a>
       </ul>
       </div>`);
  }
}

//retrieve search by from drop down menu
function dropDownMenuOptions() {
  $('.dropdown').on('click', 'a', function(event) {
    dropDown = $(this).text();
    $('.dropdown-toggle').text(dropDown);
  });
  return dropDown;
}

//reset search box
function reset() {
  $('#reset-btn').click(function(){
    location.reload(true);
  });
}

$(function() {
  watchForm();
  dropDownMenuOptions();
  reset();
})
