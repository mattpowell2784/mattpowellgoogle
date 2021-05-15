'use strict';

//https://maps.googleapis.com/maps/api/streetview?size=600x300&location=36+Diceland+Road+Banstead&heading=151.78&pitch=-0.76&key=AIzaSyA8-bJwYvWll9l7TwFW5b9TiJ9HMWPDljU
//https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${houseNumber}+${roadName}${town}&heading=151.78&pitch=-0.76&return_error_codes=true&key=AIzaSyA8-bJwYvWll9l7TwFW5b9TiJ9HMWPDljU

//
getAddressSearchValue();
function getAddressSearchValue() {
  const searchButton = document.querySelector('.search__button');

  searchButton.addEventListener('click', function () {
    event.preventDefault();
    let searchFor = document.querySelector('.search__input').value;
    console.log(searchFor);
    whereMyHouseIs(searchFor);
  });
}

const whereMyHouseIs = async function (address) {
  const img = document.querySelector('.row');

  //removes current image
  console.log(document.querySelector('.google'));
  console.log(img);
  if (document.querySelector('.google')) {
    document.querySelector('.google').remove();
  }
  //document.querySelector('.google').remove();

  try {
    //get streetview url
    const houseImage = await fetch(
      `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}&heading=151.78&pitch=-0.76&return_error_codes=true&key=AIzaSyA8-bJwYvWll9l7TwFW5b9TiJ9HMWPDljU`
    );
    console.log(houseImage);

    //throw errors
    if (houseImage.ok === false) {
      throw new Error('Problem getting Image');
    }

    //parse url when ready
    let url = await houseImage.url;
    console.log(url);

    //insert image onto page
    const html = `<img src="${url}" class="google" />`;
    img.insertAdjacentHTML('afterbegin', html);

    // throw s
  } catch (err) {
    img.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="google" >Error getting correct Image<br>Check You have entered a correct address</h1>'
    );
  }
};

//whereMyHouseIs('36 diceland road');

//
