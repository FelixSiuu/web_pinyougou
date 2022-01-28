window.addEventListener('DOMContentLoaded', function() {
    // 焦點輪播圖
    // 1.獲取元素
    var focus = document.querySelector('.focus')
    var swiper = document.querySelector('.swiper');
    var circle = document.querySelector('.circle');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;
    // swiper控制輪播圖順序  circle控制小圓點順序 
    var numCircle = 0;
    var numSwiper = 0;
    // 2.給父元素focus添加mouseenter和mouseleave事件 顯示和隱藏箭頭
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 10.滑鼠經過暫停播放器
        clearInterval(timer);
        timer = null; // 清除計時器變量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 11.滑鼠離開再次自己點擊事件
        timer = setInterval(function() {
            arrow_r.click();
        }, 3000);
    });
    // 3.動態生成小圓圈
    // 4.點擊顯示當前小圓圈 可以在生成事件的同時綁定事件
    for (var i = 0; i < swiper.children.length; i++) {
        var li = document.createElement('li'); // 創建節點
        li.setAttribute('index', i); // 紀錄當前小圓圈的索引號，通過自定義屬性來設定
        circle.appendChild(li); // 再插入
        li.addEventListener('click', function() {
            numSwiper = numCircle = this.getAttribute('index'); // 將索引號分別重新賦予小圓圈和輪播圖
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            this.className = 'current';
            // 5.點擊小圓圈移動圖片
            // 點擊小圓圈轉動圖片的核心思路：小圓圈的索引號乘以圖片的寬度 = Swiper元素的移動距離
            animate(swiper, -focusWidth * this.getAttribute('index'))
        });
    }
    circle.children[0].className = 'current';
    // 6.克隆第一張圖片li放到最後面
    var first = swiper.children[0].cloneNode(true);
    swiper.appendChild(first);
    var flag = true; // flag為節流閥 防止因為連按導致速度過快
    // 7.點擊右邊按鈕 圖片滾動一張      控制小圓圈變化
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //關閉節流閥
            // 無縫滾動：添加第一張圖片到最後一個位置，當滾動到最後一張圖片時，馬上透過修改left的值回到第一張開始第二輪
            if (numSwiper == swiper.children.length - 1) {
                swiper.style.left = 0 + 'px';
                numSwiper = 0;
            }
            numSwiper++;
            animate(swiper, -numSwiper * focusWidth, function() {
                flag = true; // 打開節流閥
            });
            numCircle++;
            numCircle = numCircle == circle.children.length ? 0 : numCircle;
            clearCircle();
        }
    });
    // 8.控制左邊按鈕
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (numSwiper == 0) {
                numSwiper = swiper.children.length - 1;
                swiper.style.left = -numSwiper * focusWidth + 'px';
            }
            numSwiper--;
            animate(swiper, -numSwiper * focusWidth, function() {
                flag = true;
            });
            numCircle--;
            numCircle = numCircle < 0 ? circle.children.length - 1 : numCircle
            clearCircle();
        }
    });
    // 封裝函數控制圓圈的類名
    function clearCircle() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[numCircle].className = 'current';
    }
    // 9.自動播放
    var timer = setInterval(function() {
        // 手動調用點擊事件
        arrow_r.click();
    }, 3000);

    // 左側欄電梯導航
    // 當頁面滑動到 猜你喜歡 模塊，淡入回到頂部按鈕
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() >= $(".recommend").offset().top) {
                $("#backToTop").fadeIn(200)
            } else {
                $("#backToTop").fadeOut(200)
            }
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".sideBar li").eq(i).addClass("current").siblings("li").removeClass("current");
                } else {
                    $(".sideBar li").eq(i).removeClass("current");
                }
            })
        });
        // 點擊回到頂部
        $("#backToTop").click(function() {
            $("body,html").stop().animate({
                scrollTop: 0
            });
        });
        // 點擊除了返回頂部的電梯
        $(".sideBar #backToTop").siblings("li").click(function() {
            var name = '.' + $(this).prop("id");
            var target = $(name).offset().top;
            $("body,html").stop().animate({
                scrollTop: target
            });
        })
    })
});