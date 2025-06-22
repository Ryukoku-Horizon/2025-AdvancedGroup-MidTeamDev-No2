const path = require("path");
const { getCircleData } = require("./gateways/circleGateway");

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const circleData = await getCircleData("*",{});

  circleData.forEach((item)=>{
    createPage({
        path: `/manage/${item.id}`,
        component: path.resolve("./src/templates/manageCirclePage.tsx"),
        context: {item},
      })
  })

}
