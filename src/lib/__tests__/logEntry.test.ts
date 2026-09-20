import { describe, expect, it } from 'vitest';

import { extractLogMarker } from '../logEntry';

describe('extractLogMarker', () => {
  it('lifts a leading age out of the sentence', () => {
    const result = extractLogMarker(
      'At 11, I started playing Growtopia and trading in-game items.',
    );

    expect(result).toEqual({
      marker: 'Age 11',
      rest: 'I started playing Growtopia and trading in-game items.',
    });
  });

  it('lifts an age range, with or without the leading "At"', () => {
    expect(
      extractLogMarker('At 13 - 16, I played a lot of FPS games.'),
    ).toEqual({ marker: 'Age 13–16', rest: 'I played a lot of FPS games.' });

    expect(extractLogMarker('13 - 16, I played a lot of FPS games.')).toEqual({
      marker: 'Age 13–16',
      rest: 'I played a lot of FPS games.',
    });
  });

  it('accepts en and em dashes in a range', () => {
    expect(extractLogMarker('At 13–16, I played games.')?.marker).toBe(
      'Age 13–16',
    );
    expect(extractLogMarker('At 13—16, I played games.')?.marker).toBe(
      'Age 13–16',
    );
  });

  it('lifts a leading year', () => {
    expect(
      extractLogMarker('In 2022, I enlisted for National Service.'),
    ).toEqual({ marker: '2022', rest: 'I enlisted for National Service.' });
  });

  it('recapitalises the remainder, which now opens the sentence', () => {
    expect(
      extractLogMarker('At 20, enlisted for National Service.')?.rest,
    ).toBe('Enlisted for National Service.');
  });

  it('leaves entries that carry no leading marker alone', () => {
    for (const text of [
      'I played a lot of Pokemon growing up.',
      'I was 11 when I started selling in-game items.',
      'When I was 17, I created my first wallet.',
      'My dad bought me a phone after nine spelling tests in 2012.',
      'I am a long-time Team Fortress 2 player.',
    ]) {
      expect(extractLogMarker(text)).toBeNull();
    }
  });

  it('does not treat a year inside the sentence as a marker', () => {
    expect(
      extractLogMarker('I traded on-chain in 2019, then moved to equities.'),
    ).toBeNull();
  });

  it('rejects a marker with nothing left after it', () => {
    expect(extractLogMarker('At 20, ')).toBeNull();
    expect(extractLogMarker('In 2016, ')).toBeNull();
  });

  it('is case-insensitive on the leading word', () => {
    expect(
      extractLogMarker('at 13, I started playing FPS games.')?.marker,
    ).toBe('Age 13');
    expect(extractLogMarker('in 2022, I enlisted.')?.marker).toBe('2022');
  });
});
