module.exports = {
    /*
     * Перенос фигурных скобок в JSX-элементах не регламентируется.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
     */
    'react/jsx-curly-newline': 0,

    /*
     * JSX доступен только в данных файлах.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
     */
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],

    /*
     * Если переносится хотябы одна пропса, то первая тоже должна перенести.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
     */
    'react/jsx-first-prop-new-line': [2, 'multiline'],

    /*
     * Обязательны корректные префиксы для хендлеров.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
     */
    'react/jsx-handler-names': 0,

    /*
     * В 'JSX' тэгах отступ ревен 4 пробелам.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
     */
    'react/jsx-indent': [2, 4],

    /*
     * В пропсах отступ ревен 4 пробелам.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
     */
    'react/jsx-indent-props': [2, 4],

    /*
     * Свойство 'key' обязательно если оно требуется.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
     */
    'react/jsx-key': 2,

    /*
     * Максимальная вложенность элементов = 10.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-depth.md
     */
    'react/jsx-max-depth': [2, { max: 10 }],

    /*
     * Между 'JSX-элементами' необязательна пустая строка. (потому что есть JSX комменты для JSX элементов).
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
     */
    'react/jsx-newline': 0,

    /*
     * Запрещены биндинги и стрелочные функции в пропсах.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
     */
    'react/jsx-no-bind': 2,

    /*
     * Запрещается в контекст провайдера помещать нестабильные пропсы.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
     */
    'react/jsx-no-constructed-context-values': 2,

    /*
     * Запрещены опасные js-ссылки (<a href="javascript:void(0)"></a>).
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
     */
    'react/jsx-no-script-url': 2,

    /*
     * Безопасное открытие ссылок не регламентируется.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
     */
    'react/jsx-no-target-blank': 0,

    /*
     * Запрещены избыточные фрагменты.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
     */
    'react/jsx-no-useless-fragment': 0,

    /*
     * Спред-пропсы разрешены.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
     */
    'react/jsx-props-no-spreading': 0,

    /*
     * Необходимо поддерживать алфавитный порядок в пропсах.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
     */
    'react/jsx-sort-props': [2, { ignoreCase: true, shorthandLast: true }],
};
