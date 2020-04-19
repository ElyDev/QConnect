//This class will contain all of the font styles that should be used through out the app. The default size & fontFamily will be
//defined here.
import colors from './colors';
import { PixelRatio, Platform, StyleSheet } from 'react-native';

//The default font family that'll be used throughout the app
const fontFamily = "Montserrat-Regular";

//Sets the base font that'll be used throughout the app based on the size of the screen
//Sets the font size
let bodyFont = 14;
const pixelRatio = PixelRatio.get();

const bodyFontSmaller = bodyFont * 0.875;
const bodyFontBigger = bodyFont * 1.25;
const bodyFontBig = bodyFont * 1.15;
const bodyFontEvenBigger = bodyFontBigger * 1.25;
const titleFont = bodyFont * 1.875;

export default StyleSheet.create({
  smallTextStyleDarkGrey: {
    fontFamily,
    fontSize: bodyFontSmaller,
    color: colors.darkGrey
  },

  smallestTextStyleDarkGrey: {
    fontFamily,
    fontSize: bodyFontSmaller * 0.7,
    color: colors.darkGrey
  },

  smallTextStylePrimaryDark: {
    fontFamily,
    fontSize: bodyFontSmaller,
    color: colors.primaryDark
  },

  mainTextStylePrimaryDark: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.primaryDark
  },

  captionTextStylePrimaryDark: {
    fontFamily,
    fontSize: bodyFontBig,
    color: colors.primaryDark
  },

  mainTextStylePrimaryLight: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.primaryLight
  },

  mainTextStyleDarkGrey: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.darkGrey
  },

  mediumTextStyleDarkestGrey: {
    fontFamily,
    fontSize: bodyFont * 1.1,
    color: colors.darkestGrey
  },

  mainTextStyleBlack: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.darkGrey
  },

  mainTextStyleGrey: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.grey
  },

  mainTextStyleDarkGreen: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.darkGreen
  },

  mainTextStyleDarkRed: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.darkRed
  },

  bigTextStyleBlack: {
    fontFamily,
    fontSize: bodyFontBigger,
    color: colors.darkGrey
  },

  bigTextStyleGreen: {
    fontFamily,
    fontSize: bodyFontBigger,
    color: colors.darkGreen
  },

  bigTextStyleDarkRed: {
    fontFamily,
    fontSize: bodyFontBigger,
    color: colors.darkRed
  },

  bigTextStyleDarkGrey: {
    fontFamily,
    fontSize: bodyFontBigger,
    color: colors.darkGrey
  },

  bigTextStyleDarkestGrey: {
    fontFamily,
    fontSize: bodyFontBigger,
    color: colors.darkestGrey
  },

  bigTextStyleWhite: {
    fontFamily,
    fontSize: bodyFontBigger,
    color: colors.white
  },

  smallTextStyleDarkGreen: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.darkGreen
  },

  smallTextStyleDarkRed: {
    fontFamily,
    fontSize: bodyFont,
    color: colors.darkRed
  },

  bigTextStylePrimaryDark: {
    fontFamily,
    fontSize: bodyFontBigger,
    color: colors.primaryDark
  },

  biggerTextStyleDarkestGrey: {
    fontFamily,
    fontSize: bodyFontEvenBigger,
    color: colors.darkestGrey
  },

  hugeTextStylePrimaryDark: {
    fontFamily,
    fontSize: titleFont,
    color: colors.primaryDark
  },
  hugeTextStylePrimaryLight: {
    fontFamily,
    fontSize: titleFont,
    color: colors.primaryLight
  },
  hugeTextStyleDarkestGrey: {
    fontFamily,
    fontSize: titleFont,
    color: colors.darkestGrey
  },

  hugeTextStyleBlack: {
    fontFamily,
    fontSize: titleFont,
    color: colors.black
  },

  hugeTextStyleDarkGrey: {
    fontFamily,
    fontSize: titleFont,
    color: colors.darkGrey
  },
});
