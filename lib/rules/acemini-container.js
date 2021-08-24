
module.exports = {
    meta: {
      type: 'problem',
      messages: {
        rootMustContainer: 'root component must is Container ',
        conLoading: 'Container props Must contain loading'
      },
      schema: [
        {
            "type": "object",
            "properties": {
                "loading": {
                    "type": "boolean"
                },
            },
            "additionalProperties": false
        }
      ]
    },
    create: function (context) {
      return {
        CallExpression(node) {
          if (
            // 判断用到了，ACEMini 函数
            (node.callee.name == 'ACEMini') 
          ) {
              // 拿到他的render函数节点
            const renderNode = node.arguments[1]
            // 判断一下是不是组件 有没有props
            const renderFnParams = renderNode.params
            const isComponent = renderFnParams && renderFnParams[1]
            // 组件不检查
            if(isComponent)return
            
            const renderBody = renderNode.body.body
            const returnStatemen = renderBody.find(e => e.type === 'ReturnStatement')
            if (!returnStatemen || returnStatemen.argument.type !== 'JSXElement') {
              return
            }

            // jsx 根节点判断
            const returnArgument = returnStatemen.argument
            const openingElementName = returnArgument.openingElement.name.name
            if (openingElementName !== 'Container') {
              const loc = returnArgument.openingElement.name.loc
              context.report({
                messageId: 'rootMustContainer',
                loc,
              })
              return
            }

            // 如果 closingElementName  不是 Container react eslint 他会自己报错的
            // const closingElementName = returnArgument.closingElement.name.name
            // if (closingElementName !== 'Container') {
            //   const loc = returnArgument.closingElement.name.loc
            //   context.report({
            //     messageId: 'rootMustContainer',
            //     loc,
            //   })
            //   return
            // }

            // 有没有loading
            const conAttributes = returnArgument.openingElement.attributes
            const loading = conAttributes.some(e => e.name.name === 'loading')
            const loc = returnArgument.openingElement.name.loc
            if (!loading) {
                context.report({
                messageId: 'conLoading',
                loc,
              })
            }
          }
        },
      }
    },
  }