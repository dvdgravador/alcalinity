import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface GavilanLogoProps {
  size?: number;
  color?: string;
}

export function GavilanLogo({ size = 64, color = '#ef4444' }: GavilanLogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
        {/* Letra G principal */}
        <Path
          d="M20 100C20 55.8 55.8 20 100 20C144.2 20 180 55.8 180 100C180 144.2 144.2 180 100 180C55.8 180 20 144.2 20 100Z"
          fill={color}
        />
        {/* Corte interior de la G */}
        <Path
          d="M100 40C133.1 40 160 66.9 160 100C160 133.1 133.1 160 100 160C66.9 160 40 133.1 40 100C40 66.9 66.9 40 100 40Z"
          fill="white"
        />
        {/* Línea horizontal interior */}
        <Path
          d="M100 85L140 85L140 115L100 115Z"
          fill={color}
        />
        {/* Detalle decorativo */}
        <Path
          d="M85 95C90 90 110 90 115 95C110 100 90 100 85 95Z"
          fill="white"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});