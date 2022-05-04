const items = document.querySelectorAll('.item')
        
items.forEach(item =>
{
    item.addEventListener('mouseover', () => 
    {
        console.log(item.childNodes[0].classList.add('img-darken'));
    })

    item.addEventListener('mouseout', () => 
    {
        console.log(item.childNodes[0].classList.remove('img-darken'));
    })
})