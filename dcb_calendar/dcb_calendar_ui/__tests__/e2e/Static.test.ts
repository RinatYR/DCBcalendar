import path from 'path';
import 'jest-allure/dist/setup';

describe('Static HTML tests', () => {
    /**
     * Проверяем наличие заголовка в сгенерированном файле статики фронта
     */
    it('HTML file, should detect the heading on page', async () => {

        await page.goto(`file:${path.join(__dirname, '../out/index.html')}`);

        const title = await page.$eval('title', (el) => el.textContent);

        expect(title).toBe('DCB Calendar');
        reporter.endStep();
    });

    /**
     * Пример, как можно скипнуть тест
     */
    it.skip('Example skipped test', async () => {
        return true;
    });
});
