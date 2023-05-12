import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Set animation timing
    const animationDelay = 2500;
    const barAnimationDelay = 3800;
    const barWaiting = barAnimationDelay - 3000;
    const lettersDelay = 50;
    const typeLettersDelay = 150;
    const selectionDuration = 500;
    const typeAnimationDelay = selectionDuration + 800;
    const revealDuration = 600;
    const revealAnimationDelay = 1500;

    initHeadline();

    function initHeadline() {
      const headline = document.querySelector('.cd-headline');
      // Insert <i> element for each letter of a changing word
      singleLetters(headline.querySelectorAll('b'));
      // Initialize headline animation
      animateHeadline(headline);
    }

    function singleLetters(words) {
      words.forEach(word => {
        const letters = word.textContent.split('');
        const selected = word.classList.contains('is-visible');
        let newLetters = '';
        for (let i in letters) {
          if (word.parentElement.classList.contains('rotate-2')) {
            letters[i] = '<em>' + letters[i] + '</em>';
          }
          letters[i] = selected
            ? '<i class="in">' + letters[i] + '</i>'
            : '<i>' + letters[i] + '</i>';
          newLetters += letters[i];
        }
        word.innerHTML = newLetters;
        word.style.opacity = 1;
      });
    }

    function animateHeadline(headlines) {
      let duration = animationDelay;
      headlines.forEach(headline => {
        if (headline.classList.contains('loading-bar')) {
          duration = barAnimationDelay;
          setTimeout(() => {
            headline.querySelector('.cd-words-wrapper').classList.add('is-loading');
          }, barWaiting);
        } else if (headline.classList.contains('clip')) {
          const spanWrapper = headline.querySelector('.cd-words-wrapper');
          const newWidth = spanWrapper.offsetWidth + 10;
          spanWrapper.style.width = newWidth + 'px';
        } else if (!headline.classList.contains('type')) {
          const words = headline.querySelectorAll('.cd-words-wrapper b');
          let width = 0;
          words.forEach(word => {
            const wordWidth = word.offsetWidth;
            if (wordWidth > width) {
              width = wordWidth;
            }
          });
          headline.querySelector('.cd-words-wrapper').style.width = width + 'px';
        }

        // Trigger animation
        setTimeout(() => {
          hideWord(headline.querySelector('.is-visible'));
        }, duration);
      });
    }

    function hideWord(word) {
      const nextWord = takeNext(word);

      if (word.parentElement.classList.contains('type')) {
        const parentSpan = word.parentElement;
        parentSpan.classList.add('selected');
        parentSpan.classList.remove('waiting');
        setTimeout(() => {
          parentSpan.classList.remove('selected');
          word.classList.remove('is-visible');
          word.classList.add('is-hidden');
          word.querySelector('i').classList.remove('in');
          word.querySelector('i').classList.add('out');
        }, selectionDuration);
        setTimeout(() => {
          showWord(nextWord, typeLettersDelay);
        }, typeAnimationDelay);
      } else if (word.parentElement.classList.contains('letters')) {
        const bool = word.querySelectorAll('i').length >= nextWord.querySelectorAll('i').length;
        hideLetter(word.querySelector('i'), word, bool, lettersDelay);
        showLetter(nextWord.querySelector('i'), next,Word, bool, lettersDelay);
	} else if (word.parentElement.classList.contains('clip')) {
	  const wordsWrapper = word.parentElement;
	  wordsWrapper.animate(
		{ width: '2px' },
		revealDuration,
		() => {
		  switchWord(word, nextWord);
		  showWord(nextWord);
		}
	  );
	} else if (word.parentElement.classList.contains('loading-bar')) {
	  const wordsWrapper = word.parentElement;
	  wordsWrapper.classList.remove('is-loading');
	  switchWord(word, nextWord);
	  setTimeout(() => {
		hideWord(nextWord);
	  }, barAnimationDelay);
	  setTimeout(() => {
		wordsWrapper.classList.add('is-loading');
	  }, barWaiting);
	} else {
	  switchWord(word, nextWord);
	  setTimeout(() => {
		hideWord(nextWord);
	  }, animationDelay);
	}
	
	}
	
	function showWord(word, duration) {
	if (word.parentElement.classList.contains('type')) {
	  showLetter(word.querySelector('i'), word, false, duration);
	  word.classList.add('is-visible');
	  word.classList.remove('is-hidden');
	} else if (word.parentElement.classList.contains('clip')) {
	  const wordsWrapper = word.parentElement;
	  const wordWidth = word.offsetWidth + 10;
	  wordsWrapper.style.width = wordWidth + 'px';
	  setTimeout(() => {
		hideWord(word);
	  }, revealAnimationDelay);
	}
	}
	
	function hideLetter(letter, word, bool, duration) {
	letter.classList.remove('in');
	letter.classList.add('out');
	
	if (!letter.isSameNode(word.lastElementChild)) {
	  setTimeout(() => {
		hideLetter(letter.nextElementSibling, word, bool, duration);
	  }, duration);
	} else if (bool) {
	  setTimeout(() => {
		hideWord(takeNext(word));
	  }, animationDelay);
	}
	
	if (letter.isSameNode(word.lastElementChild) && document.documentElement.classList.contains('no-csstransitions')) {
	  const nextWord = takeNext(word);
	  switchWord(word, nextWord);
	}
	}
	
	function showLetter(letter, word, bool, duration) {
	letter.classList.add('in');
	letter.classList.remove('out');
	
	if (!letter.isSameNode(word.lastElementChild)) {
	  setTimeout(() => {
		showLetter(letter.nextElementSibling, word, bool, duration);
	  }, duration);
	} else {
	  if (word.parentElement.classList.contains('type')) {
		setTimeout(() => {
		  word.parentElement.classList.add('waiting');
		}, 200);
	  }
	  if (!bool) {
		setTimeout(() => {
		  hideWord(word);
		}, animationDelay);
	  }
	}
	}
	
	function takeNext(word) {
	return !word.isSameNode(word.parentElement.lastElementChild)
	  ? word.nextElementSibling
	  : word.parentElement.firstElementChild;
	}
	
	function takePrev(word) {
	return !word.isSameNode(word.parentElement.firstElementChild)
	  ? word.previousElementSibling
	  : word.parentElement.lastElementChild;
	}
	
	function switchWord(oldWord, newWord) {
	oldWord.classList.remove('is-visible');
	oldWord.classList.add('is-hidden');
	newWord.classList.remove('is-hidden');
	newWord.classList.add('is-visible');
	}
	
	return (
	<div className="cd-headline">
	  {/* Add your HTML content here */}
	</div>
	);
	})}

	export default MyComponent;
	
