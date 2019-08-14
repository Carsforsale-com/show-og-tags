/*jshint strict:false, browser:true */

(function bookmarklet() {
    const hasStyleBlock = document.querySelector('#taginfo_styles');

    if (!hasStyleBlock) {
        const styleBlock = document.createElement('style');

        styleBlock.id = 'taginfo_styles';
        styleBlock.innerHTML = `
            .taginfo,
            .taginfo__close {
            border: 2px solid #000;
            box-shadow: 3px 4px #000;
            padding: .5em;
            }

            .taginfo {
            background: rgba(255, 255, 255, .92);
            max-width: 75%;
            position: fixed;
            right: 1em;
            top: 1em;
            z-index: 1000;
            }

            .taginfo__close {
            background: rgba(255, 255, 255, 1);
            cursor: pointer;
            margin: -.75em -.5em 0 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 10;
            }

            .taginfo__wrapper {
            overflow: auto;
            padding-bottom: .5em;
            }

            .taginfo__heading {
            border-bottom: 1px solid #000;
            font-size: 1rem;
            font-weight: normal;
            margin: 0 0 .5em 0;
            padding-bottom: .5em;
            text-align: center;
            }

            .taginfo__thumbnail {
            display: inline-block;
            max-height: 4em;
            }

            .taginfo__item {
            white-space: nowrap;
            }

            .taginfo__missing {
            padding-right: 2em;
            }
        `;

        document.head.appendChild(styleBlock);
    }

    const tags = [
        ...document.querySelectorAll('[property^="og:"]'),
        document.querySelector('title'),
        document.querySelector('meta[name="description"]'),
        document.querySelector('h1'),
        document.querySelector('h2')
    ];

    let taginfo = `<div class="taginfo__wrapper">`;
    if (tags.length) {
        let tagsHtml = '';
        let tagCount = 0;

        for (const item of tags) {
            if (item) {
                tagCount += 1;

                const property = item.getAttribute('property') || item.getAttribute('name') || item.tagName.toLowerCase();
    
                let content = item.getAttribute('content') || item.innerHTML;
                if (property === 'og:image') {
                    content = `<img src="${content}" title="${content}" alt="" class="taginfo__thumbnail" />`;
                }
    
                tagsHtml += `<div class="taginfo__item">
                    <strong>${property}:</strong>
                    ${content}
                </div>`;
            }
        }

        taginfo += `
            <h1 class="taginfo__heading">🎉 Found ${tagCount} SEO or Open Graph ${tagCount === 1 ? 'tag' : 'tags'}!</h1>
            ${tagsHtml}
        `;
    } else {
        taginfo += `<p class="taginfo__missing">😣 No SEO or Open Graph tags were found.</p>`;
    }
    taginfo += `</div>`;

    const container = document.createElement('aside');
    container.innerHTML = taginfo;
    container.classList.add('taginfo');

    const close = document.createElement('button');
    close.innerHTML = `❌`;
    close.classList.add('taginfo__close');
    close.addEventListener('click', () => {
        document.body.removeChild(container);
    });

    container.appendChild(close);
    document.body.appendChild(container);
}());
