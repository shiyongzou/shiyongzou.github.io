
const { createClient } = supabase;
const body=window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65']('\x62\x6f\x64\x79')[0];const _img=window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x42\x79\x49\x64']('\x69\x6d\x67');let _key=_img['\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65']('\x64\x61\x74\x61');body['\x72\x65\x6d\x6f\x76\x65\x43\x68\x69\x6c\x64'](_img);let _keyList=_key['\x73\x70\x6c\x69\x74']('\x3d\x3d\x3d\x3d');const supabaseUrl=_keyList[1];const supabaseKey=_keyList[0];

function createSupabase() {
  return createClient(supabaseUrl, supabaseKey);
}

// 创建 Supabase 实例

const Supabase = createSupabase();

// 从表格中获取数据
async function fetchUserData() {
  const { data, error } = await Supabase
    .from('user_list')
    .select('*');
  if (error) {
    console.error('获取数据出错:', error.message);
  } else {
    // console.log('获取的用户数据:', data);
  }
}

// 向表格中插入数据
async function insertData(interview_time, city, ip) {
  const { data, error } = await Supabase
    .from('user_list')
    .insert({ interview_time, city, ip }).select();
  if (error) {
    console.error('插入数据出错:', error.message);
  } else {
    // console.log('成功插入数据:', data);
  }
}

function getCurrentTime() {
  // 创建 Date 对象，表示当前时间
  const currentDate = new Date();

  // 获取年、月、日、小时、分钟、秒钟
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // 将结果拼接为年月日时分秒格式
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

// 在页面加载完成后执行代码
document.addEventListener('DOMContentLoaded', async function () {
  await fetchUserData()
  getPublicIP().then(ip => {
    getLocationByIP(ip).then(async location => {
      await insertData(getCurrentTime(), location.city || location.country, ip);
      const textBox=document.getElementById('top_text');
      textBox.innerHTML='欢迎来自<span>' + (location.city || location.country) + '</span>的老色批～';
      textBox.style.opacity=1;
    });
  });
});