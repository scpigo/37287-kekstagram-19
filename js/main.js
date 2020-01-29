// Имена
var namesTemplate = [
  'Беликов Пимен',
  'Сафонов Николай',
  'Коломников Владислав',
  'Чюличков Леонид',
  'Барсуков Мартын',
  'Панкин Борислав',
  'Жигунов Владлен',
  'Бендлин Руслан',
  'Люба Эрнст',
  'Шорин Бронислав'
];

// Текст комментариев
var commentTemplates = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Рандом
var randomize = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Сборка текста комментария
var assembleCommentText = function () {
  var commentText = '';

  var sentences = randomize(1, 2);

  for (var i = 1; i <= sentences; i++) {
    commentText += commentTemplates[randomize(0, commentTemplates.length - 1)] + ' ';
  }

  return commentText.substring(0, commentText.length - 1);
}

// Генерация массива комментариев
var generateComments = function() {
  var comments = [];

  for (var i = 0; i < randomize(1, 4); i++) {
    var comment = {
      avatar: 'img/avatar-' + randomize(1, 6) +'.svg',
      message: assembleCommentText(),
      name: namesTemplate[randomize(0, namesTemplate.length - 1)]
    }

    comments.push(comment);
  }

  return comments;
};

// Генерация данных о фотографии
var insertPhotoInArray = function (num) {
  var photo = {
      url: 'photos/' + (num + 1) + '.jpg',
      description: '???',
      likes: randomize(15, 200),
      comments: generateComments()
    }

  photoArray.push(photo);
};

// Генерация DOM-элемента с фотографией
var generatePictureElement = function (num) {
  var picture = picTemplate.cloneNode(true);

  var img = picture.querySelector('.picture__img');
  img.src = photoArray[num].url;

  var likes = picture.querySelector('.picture__likes');
  likes.textContent = photoArray[num].likes;

  var comments = picture.querySelector('.picture__comments');
  comments.textContent = photoArray[num].comments.length;

  pictures.appendChild(picture);
}

// Заполнение массива нужным кол-вом изображений
var fillPhotoArray = function (arrElements) {
  for (var i = 0; i < arrElements; i++) {
    insertPhotoInArray(i);
    var picture = generatePictureElement(i);
  };
}

var pictures = document.querySelector('.pictures'); // Блок с изображениями
var picTemplate = document.querySelector('#picture').content; // Шаблон изображения

var photoArray = [];  // Массив с фотографиями

fillPhotoArray(25); // Вызов функции заполнения массива
