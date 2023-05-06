import { Vector2D } from "../../library/math";
import { Rect } from "../../library/math/Rect";

export class GameModel {
    public screen_box: Rect = new Rect(0, 0, 800, 600);
    public text_box: Rect = Rect.fromCenterAndSize({ x: 400, y: 300 }, { x: 100, y: 100 });
    public screen_box_inset: Rect;
    public text_velocity: Vector2D = new Vector2D(-100, -100);
    public text_content: string = "Bouncing Text";
    public debug: boolean = false;

    constructor(
        public context: CanvasRenderingContext2D,
    ) {
        // set the size of the text box to the size of the text        
        const text_metrics = this.context.measureText(this.text_content);
        this.text_box.size.x = text_metrics.actualBoundingBoxRight + text_metrics.actualBoundingBoxLeft;
        this.text_box.size.y = text_metrics.actualBoundingBoxAscent + text_metrics.actualBoundingBoxDescent;
        // inset the screen box by the size of the text box,
        // this will be the area the textbox should always touch
        this.screen_box_inset = this.screen_box.cpy().inset(this.text_box.size);
    }

    public update(delta_seconds: number) {
        // update text position
        this.text_box.move(this.text_velocity.cpy().mul(delta_seconds / 1000));
        // if the distance to this inner box is greater than 0, the text box is outside the screen box
        const distance = this.screen_box_inset.distance(this.text_box);
        if (Math.abs(distance.x) > 0) {
            this.text_velocity.x = Math.abs(this.text_velocity.x) * ((distance.x > 0) ? -1 : 1);
            this.text_box.center.x -= distance.x * 2;
        }
        if (Math.abs(distance.y) > 0) {
            this.text_velocity.y = Math.abs(this.text_velocity.y) * ((distance.y > 0) ? -1 : 1);
            this.text_box.center.y -= distance.y * 2;
        }
    }
}