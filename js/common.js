window.addEventListener('DOMContentLoaded', function() {
    // 導航欄區域
    var arrowIcon = document.querySelectorAll('.arrow-icon');
    for (var i = 0; i < arrowIcon.length; i++) {
        arrowIcon[i].addEventListener('mouseover', function() {
            this.firstElementChild.style.display = 'block';
        })
        arrowIcon[i].addEventListener('mouseleave', function() {
            this.firstElementChild.style.display = 'none';
        })
    }
    // 全部商品分類模塊
    var dd = document.querySelector('.dd');
    var ul = dd.querySelector('ul');
    var li = ul.querySelectorAll('li');
    ul.addEventListener('mouseover', function(event) {
        for (var i = 0; i < li.length; i++) {
            if (event.target == li[i]) {
                event.target.lastElementChild.style.display = 'block';
                var fixTop = li[i].offsetHeight;
                fixTop = fixTop == 31 ? 31 : 31;
                event.target.lastElementChild.style.top = -fixTop * i + 'px';
                li[i].addEventListener('mouseleave', function(event) {
                    event.target.lastElementChild.style.display = 'none';
                });
            }
        }
    });
});