/*jshint strict:false, browser:true */

(function bookmarklet() {
  const tags = document.querySelectorAll('[property^="og:"]');

  let taginfo = `<div style="overflow: auto; padding-bottom: .5em;">`;
  if (tags.length) {
      taginfo += `<div style="text-align: center; padding-bottom: .5em; margin-bottom: .5em; border-bottom: 1px solid #000">🎉 Found ${tags.length} Open Graph ${tags.length === 1 ? 'tag' : 'tags'}!</div>`;
      
      for (const item of tags) {
          const property = item.getAttribute('property');

          let content = item.getAttribute('content');
          if (property === 'og:image') {
              content = `<img src="${content}" title="${content}" alt="" style="display: inline-block; max-height: 4em;" />`;
          }

          taginfo += `<div style="white-space: nowrap;">
              <strong>${property}:</strong>
              ${content}
          </div>`;
      }
  } else {
      taginfo += `<div style="padding-right: 2em;">😣 No Open Graph tags were found.</div>`;
  }
  taginfo += `</div>`;

  const div = document.createElement('div');
  div.innerHTML = taginfo;
  div.style.background = 'rgba(255, 255, 255, .92)';
  div.style.border = '2px solid #000';
  div.style.boxShadow = '3px 4px #000';
  div.style.maxWidth = '75%';
  div.style.padding = '.5em';
  div.style.position = 'fixed';
  div.style.right = '1em';
  div.style.top = '1em';
  div.style.zIndex = 1000;
  

  const close = document.createElement('button');
  close.innerHTML = `❌`;
  close.style.background = 'rgba(255, 255, 255, 1)';
  close.style.border = div.style.border;
  close.style.boxShadow = div.style.boxShadow;
  close.style.margin = '-.75em -.5em 0 0';
  close.style.padding = div.style.padding;
  close.style.position = 'absolute';
  close.style.right = '0';
  close.style.top = '0';
  close.style.zIndex = 10;
  close.addEventListener('click', () => {
      document.body.removeChild(div);
  });
  div.appendChild(close);

  document.body.appendChild(div);
}());
