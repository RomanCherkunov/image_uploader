export function upload(selector, options = {}) {
    const input = document.querySelector(selector)
    const preview = document.createElement('div')

    preview.classList.add('preview')

    const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'открыть'

    if (options.multi) {
        input.setAttribute('multiple', true)
    }

    if(options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()
    const changeHandler = e => {
        if(!e.target.files.length) {
            return
        }

        preview.innerHTML = ''
        const files = Array.from(e.target.files)
        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }
            const reader = new FileReader()
            reader.onload = e => {
                preview.insertAdjacentHTML('afterbegin', `
                <div class='preview-image'>
                    <div class='preview-remove'>&times</div>
                    <img src="${e.target.result}" alt='${file.name}'/>
                </div>
                `)
            }
            reader.readAsDataURL(file)
        })
    }
    

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
}