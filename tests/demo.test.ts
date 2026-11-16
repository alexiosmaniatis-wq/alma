import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllGlobals();
});

it('shows utility results and updates them when inputs change', async () => {
  function element(value = '') {
    let onInput = () => {};
    return {
      value,
      textContent: '',
      addEventListener: (_event: string, callback: () => void) => {
        onInput = callback;
      },
      input: () => onInput(),
    };
  }

  const elements: Record<string, ReturnType<typeof element>> = {
    '#text': element('Hello World'),
    '#email': element('hello@example.com'),
    '#color': element('#3157c8'),
    '#slug': element(),
    '#camel': element(),
    '#email-result': element(),
    '#rgb': element(),
    '#contrast': element(),
  };
  vi.stubGlobal('document', { querySelector: (selector: string) => elements[selector] });
  vi.resetModules();
  await import('../demo/main.js');

  expect(elements['#slug'].textContent).toBe('hello-world');
  expect(elements['#camel'].textContent).toBe('helloWorld');
  expect(elements['#email-result'].textContent).toBe('true');

  elements['#text'].value = 'New Example';
  elements['#text'].input();
  elements['#email'].value = 'invalid';
  elements['#email'].input();
  elements['#color'].value = '#000000';
  elements['#color'].input();

  expect(elements['#slug'].textContent).toBe('new-example');
  expect(elements['#camel'].textContent).toBe('newExample');
  expect(elements['#email-result'].textContent).toBe('false');
  expect(elements['#rgb'].textContent).toBe('{"r":0,"g":0,"b":0}');
  expect(elements['#contrast'].textContent).toBe('21.00');
});
