module.exports = {
    /*
     * Отступы = 4 пробела.
     * Дублирующее правило 'indent' из eslint, создано для перестраховки.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
     */
    '@typescript-eslint/indent': [2, 4],

    /*
     * У функций бывают очень длинные возвращаемые типы, поэтому это не всегда целесообразно для соблюдения чистоты кода.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    '@typescript-eslint/explicit-function-return-type': 0,

    /*
     * Правила разделителей в интерфейсах (точка с запятой).
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
     */
    '@typescript-eslint/member-delimiter-style': 2,

    /*
     * Запрещаются неиспользованные переменные.
     * Кроме переменных в типизации и спред-операторов.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
     */
    '@typescript-eslint/no-unused-vars': [
        2,
        {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
        },
    ],

    /*
     * Типизировать граничные функции необязательно. TODO: Пересмотреть правило!
     * Сейчас достаточно использования '@typescript-eslint/explicit-function-return-type'.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
     */
    '@typescript-eslint/explicit-module-boundary-types': 0,

    /*
     * Модификаторы доступа необязательны.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
     */
    '@typescript-eslint/explicit-member-accessibility': 0,

    /*
     * Запрещается использовать сущности до их объявления. TODO: Включить полностью!
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
     */
    '@typescript-eslint/no-use-before-define': 1,

    /*
     * Разрешаются к использованию всевозможные типы.
     * В будущем тут можно явно ограничивать использование типов.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
     */
    '@typescript-eslint/ban-types': 0,

    /*
     * Разрешается импорт через require.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
     */
    '@typescript-eslint/no-var-requires': 0,
};
