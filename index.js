const axios = require('axios');
const cheerio = require('cheerio');

const SIFOU_DOMAIN = 'https://segmentfault.com';


// blogs, blogs/hottest/weekly, blogs/hottest/monthly, blogs/newest

/**
 * 爬取思否推荐文章列表
 *
 * @param {string} domain 域名
 * @param {string} [category='blogs'] 类别，默认是推荐文章
 */
const getRecommendationBlogs = (domain = SIFOU_DOMAIN, category = 'blogs') => {

  return axios.get(`${domain}/${category}`).then(resp => {
    const $ = cheerio.load(resp.data);
    const lis = $('ul.list-group.list-group-flush').children();
    const blogList = [];
    for (let i = 0; i < lis.length; i++) {
      const li = lis.eq(i);
      blogList.push({
        title: li.find('h5').text().trim(),
        author: li.find('.name').text().trim(),
        createTime: li.find('.create-time').text().trim(),
        link: `${domain}${li.find('.title').attr('href')}`,
      });
    }
    return blogList;
  });
}

async function main() {
  // const recommendationBlogs = await getRecommendationBlogs(null, 'blogs');
  const weeklyBlogs = await getRecommendationBlogs(SIFOU_DOMAIN, 'blogs/hottest/weekly');
  // const monthlyBlogs = await getRecommendationBlogs(null, 'blogs/hottest/monthly');
  // const latestBlogs = await getRecommendationBlogs(null, 'blogs/newest');
  console.log(weeklyBlogs);
}

main();


/**
 * 获取目标用户的 github 仓库，这个是找的例子
 *
 */
// const getRepo = () => {
//   axios.get("https://github.com/kiritoxf?tab=repositories").then(resp => {
//     var $ = cheerio.load(resp.data)
//     var lis = $("#user-repositories-list li")
//     var repos = []
//     for (var i = 0; i < lis.length; i++) {
//       var li = lis.eq(i)
//       var repo = {
//         repoName: li.find("h3").text().trim(),
//         repoUrl: li.find("h3 a").attr("href").trim(),
//         repoDesc: li.find("p").text().trim(),
//         language: li.find("[itemprop=programmingLanguage]").text().trim(),
//         star: li.find(".muted-link.mr-3").eq(0).text().trim(),
//         fork: li.find(".muted-link.mr-3").eq(1).text().trim(),
//         forkedFrom: li.find(".f6.text-gray.mb-1 a").text().trim()
//       }
//       repos.push(repo)
//     }
//     console.log(repos)
//   });
// }

// getRepo();