 // 緩動動畫函數封裝obj目標對象  target目標位置  
 // 思路：
 // 1. 讓div每次移動的距離設定為可變的數值
 // 2. 核心算法：（目標值 - 現在的位置）/10 做為==作為每次移動的距離
 // 3. 停止動畫：設置停止計時器的setInterval()
 function animate(obj, target, callback) {

     // 先清除以前的定時器，只保留當前的一個定時器執行
     clearInterval(obj.timer); // 每次調用函數先清除以前的計時器防止速度不相符
     obj.timer = setInterval(function() {
         // 步長值必須寫在函數裡面
         // 把步長值寫成整數，
         var step = (target - obj.offsetLeft) / 10;
         step = step < 0 ? Math.floor(step) : Math.ceil(step);
         // 利用判斷條件判斷若向右移動，步長值往上去整，反之則向下取整
         if (obj.offsetLeft == target) {
             clearInterval(obj.timer);
             // 回調函數：span對象執行完動畫之後再執行style的變化，將函數已參數的形式傳遞，調用的時機在定時器結束裡面
             callback && callback();
         }
         // 若需要勻速運動，步長值step可以設置為不變的數值
         obj.style.left = obj.offsetLeft + step + 'px';

     }, 15);
 }