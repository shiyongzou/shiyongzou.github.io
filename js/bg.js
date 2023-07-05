   // 创建画布
   const canvas = document.getElementById("canvas");
   const ctx = canvas.getContext("2d");

   // 更新画布尺寸为窗口尺寸
   function updateCanvasSize() {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
   }
   // 初始化画布尺寸
   updateCanvasSize();
   // 监听窗口变化事件
   window.addEventListener('resize', updateCanvasSize);

   // 定义星光数量和速度
   const starCount = (canvas.width*canvas.height)/1500;
   const speed = 3;

   // 定义星光数组
   let stars = [];

   // 初始化星光数组
   function initializeStars() {
       for (let i = 0; i < starCount; i++) {
           const x = (Math.random() - 0.5) * canvas.width; // 横向位置随机
           const y = (Math.random() - 0.5) * canvas.height; // 纵向位置随机
           const z = Math.random() * canvas.width;
           const radius = Math.random() * 2 + 1;
           const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

           stars.push({ x, y, z, radius, color });
       }
   }
   initializeStars();

   // 更新星光的位置
   function updateStars() {
       for (let i = 0; i < starCount; i++) {
           stars[i].z -= speed;
           if (stars[i].z < 1) {
               stars[i].z = canvas.width;
           }
       }
   }

   // 绘制星光
   function drawStars() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);

       for (let i = 0; i < starCount; i++) {
           const perspective = canvas.width / (canvas.width + stars[i].z); // 视角透视效果

           ctx.beginPath();
           ctx.arc(
               stars[i].x * perspective + canvas.width / 2,
               stars[i].y * perspective + canvas.height / 2,
               stars[i].radius * perspective,
               0,
               Math.PI * 2
           );
           ctx.fillStyle = stars[i].color;
           ctx.fill();
       }
   }

   // 绘制星空背景
   function drawBackground() {
       const bgGradient = ctx.createRadialGradient(
           canvas.width / 2,
           canvas.height / 2,
           0,
           canvas.width / 2,
           canvas.height / 2,
           Math.max(canvas.width, canvas.height) / 2
       );

       bgGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
       bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");

       ctx.fillStyle = bgGradient;
       ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   // 动画循环
   function animate() {
       updateStars();
       drawBackground();
       drawStars();

       requestAnimationFrame(animate);
   }
   animate();