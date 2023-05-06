import { GameModel } from "../models/GameModel";
import { View } from "../../library/abstract/mvc/View";

export class GameView implements View {

    public constructor(
        public context: CanvasRenderingContext2D,
    ) {
        this.resetCanvasState();
    }

    public update(delta_ms: number): void {
        // do nothing
    }

    public render(model: GameModel): void {
        this.resetCanvasState();
        this.context.fillText(model.text_content, model.text_box.center.x, model.text_box.center.y);
        if (model.debug) {
            this.context.strokeStyle = "#f00";
            this.context.strokeRect(model.screen_box_inset.x, model.screen_box_inset.y, model.screen_box_inset.w, model.screen_box_inset.h);
            this.context.strokeRect(model.text_box.x, model.text_box.y, model.text_box.w, model.text_box.h);
        }
    }

    /**
     * Reset default canvas state and paint the background
     */
    protected resetCanvasState() {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, 800, 600);
        this.context.fillStyle = "#fff";
        this.context.font = "46px monospace";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.imageSmoothingEnabled = false;
    }
}