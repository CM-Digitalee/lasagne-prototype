import { IsNumberValuePipe } from './is-number-value.pipe';

describe('IsNumberValuePipe', () => {
  it('create an instance', () => {
    const pipe = new IsNumberValuePipe();
    expect(pipe).toBeTruthy();
  });
});
