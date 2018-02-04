import BaseCanvas from "./BaseCanvas"
import Pulse from "./../shape/Pulse"

const   constoptions={
    pulseRadius: 25,
    pulseBorderWidth: 3,
    arcLabelFont: '15px sans-serif',
    color:'red',
    size:30

};

class GLCanvasScatter extends BaseCanvas{
    constructor(){
        super();
    }

    draw(canvas, dataSet, options,renderer) {
        var data = dataSet.get();
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        context.save();
        var speed=options.speed||5
        var _data=[];
        for(var i=0;i<data.length;i++){
            var obj=data[i];
            var xy=obj.xy;
            var size=obj.size||options.size||constoptions.size;
            var x=xy[0];
            var y=xy[1];
            var color=obj.color||obj.strokeStyle||ojb.fillStyle||options.strokeStyle||options.fillStyle||constoptions.color;
            var borderWidth=options.lineWidth||constoptions.pulseBorderWidth;
            var font=options.font||constoptions.font;
            var name=obj.name;
            var p=new Pulse({
                x:x,
                y:y,
                // size:size,
                color:color,
                radius:size,
                borderWidth:borderWidth,
                font:font,
                name:name
            })
            _data.push(p);
        }
        this._data=_data;

        var self=this;
        function drawFrame(){
            canvas.width += speed;
            canvas.width -= speed;
            if(self.animation){
                window.cancelAnimationFrame(self.animation)
            }
            self.animation=requestAnimationFrame(drawFrame);
            for(var i=0;i<self._data.length;i++){
                self._data[i].draw(context);
            }
            renderer.completeRender();
            // context.clearRect(0,0,context.width,context.height);
        }
        drawFrame();
    }
}

export default GLCanvasScatter;