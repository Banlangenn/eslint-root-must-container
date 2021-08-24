'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

let rule = require('../../../lib/rules/acemini-container');

let RuleTester = require('eslint').RuleTester;
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

let ruleTester = new RuleTester({
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    parser: require.resolve('@typescript-eslint/parser'),
});


ruleTester.run('acemini-container', rule, {

    valid: [ // 合法示例
      `export default ACEMini({
        state: {
        },
      }, function () {
        return  (
          <Container loading={true} className="pages-verification-list-com-item-index" onClick={() => { navigateTo({ url: props.navigate }) }}>
            <View className="header">
              <View className="name">
                <Text>{props.name}</Text>
                <Text className="status-desc">{props.statusDesc}</Text>
              </View>
            </View>
          </Container>
        )
      })
      `,
    ],

    invalid: [ // 不合法示例
        {
            code: `
            export default ACEMini({
              state: {
              },
            }, function () {
              return  (
                <View className="pages-verification-list-com-item-index" onClick={() => { navigateTo({ url: props.navigate }) }}>
                  <View className="header">
                    <View className="name">
                      <Text>{props.name}</Text>
                      <Text className="status-desc">{props.statusDesc}</Text>
                    </View>
                  </View>
                </View>
              )
            })
            `
          ,
            errors: [
                {
                    messageId: 'rootMustContainer',
                },
            ],
        },
        {
          code:  `
          export default ACEMini({
            state: {
            },
          }, function () {
            return  (
              <Container className="pages-verification-list-com-item-index" onClick={() => { navigateTo({ url: props.navigate }) }}>
                <View className="header">
                  <View className="name">
                    <Text>{props.name}</Text>
                    <Text className="status-desc">{props.statusDesc}</Text>
                  </View>
                </View>
              </Container>
            )
          })
          `,
          errors: [
              {
                  messageId: 'conLoading',
              },
          ],
      },

       
    ],
});