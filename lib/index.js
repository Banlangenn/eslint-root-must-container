/**
 * @fileoverview aceMini 根组件必须为Container
 * @author banlangen
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");


module.exports.configs = {
    // 导出自定义规则
    recommended: {
      plugins: ['acemini-container'],
      rules: {
        'acemini-container/acemini-container': ['error'],
      },
    },
  };
