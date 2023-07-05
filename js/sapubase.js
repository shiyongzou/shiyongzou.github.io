
const { createClient } = supabase;
function createSupabase() {
  console.log(createClient);
  return createClient(supabaseUrl, supabaseKey);
}

// 创建 Supabase 实例
const supabaseUrl = 'https://nwvnsymbekhmhhhzxmfo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dm5zeW1iZWtobWhoaHp4bWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDgzMjEsImV4cCI6MjAwNDEyNDMyMX0.FUbzuWL5y3EiSDp0G6JwM6CRQEV9pm-Vi8u5p6qXhMQ';
const Supabase = createSupabase();

// 从表格中获取数据
async function fetchUserData() {
  const { data, error } = await Supabase
    .from('user_list')
    .select('*');
  if (error) {
    console.error('获取数据出错:', error.message);
  } else {
    console.log('获取的用户数据:', data);
  }
}

// 向表格中插入数据
async function insertData(interview_time, city, ip) {
  const { data, error } = await Supabase
    .from('user_list')
    .insert({id:1, interview_time, city, ip }).select();
  if (error) {
    console.error('插入数据出错:', error.message);
  } else {
    console.log('成功插入数据:', data);
  }
}
function getCurrentTime() {
  // 创建 Date 对象，表示当前时间
  const currentDate = new Date();

  // 获取年、月、日
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  // 将结果拼接为年月日格式
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
// 在页面加载完成后执行代码
document.addEventListener('DOMContentLoaded', async function () {
  await fetchUserData()
  getPublicIP().then(ip => {
    getLocationByIP(ip).then(async location => {
      await insertData(getCurrentTime(), location.city || location.country, ip);
      alert('欢迎来自' + location.city + '的老色批～')
    });
  });
});