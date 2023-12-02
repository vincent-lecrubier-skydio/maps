import Map from '../../../../lib/Map.js';
import OSM from '../../../../lib/source/OSM.js';
import React, {useState} from 'react';
import StadiaMaps from '../../../../lib/source/StadiaMaps.js';
import TileLayer from '../../../../lib/layer/Tile.js';
import View from '../../../../lib/View.js';

function Slider() {
  const [percent, updatePercent] = useState(50);

  function onPrerender(event) {
    const ctx = event.context;
    const width = (ctx.canvas.width * percent) / 100;
    const start = 0;
    const end = width;

    ctx.save();
    ctx.beginPath();
    ctx.rect(start, 0, end, ctx.canvas.height);
    ctx.clip();
  }

  function onPostrender(event) {
    event.context.restore();
  }

  return (
    <>
      <Map>
        <View options={{center: [0, 0], zoom: 1}} />
        <TileLayer>
          <OSM />
        </TileLayer>
        <TileLayer onPrerender={onPrerender} onPostrender={onPostrender}>
          <StadiaMaps options={{layer: 'alidade_smooth_dark'}} />
        </TileLayer>
      </Map>
      <input
        type="range"
        min={0}
        max={100}
        value={percent}
        onChange={event => updatePercent(event.target.value)}
      />
    </>
  );
}

export default Slider;
