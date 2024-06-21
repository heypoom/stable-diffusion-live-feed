import PIL.Image as PILImage

from utils.pipelines import img2img
from utils.pipeline_manager import denoise

STEPS = 50
PROMPT_2 = "painting like an epic poem of malaya"
PROMPT_2B = "crowd of people in a public space"
GUIDANCE_SCALE_2B = 8.5

MALAYA = PILImage.open("./malaya.png").resize((768, 768)).convert("RGB")
POEM_OF_MALAYA_SIZE = (960, 800)


async def infer_program_2(strength: float):
    width, height = POEM_OF_MALAYA_SIZE

    def pipeline(on_step_end):
        return img2img(
            image=MALAYA,
            prompt=PROMPT_2,
            strength=strength,
            num_inference_steps=STEPS,
            callback_on_step_end=on_step_end,
            callback_on_step_end_tensor_inputs=["latents"],
            width=width,
            height=height,
        )

    async for out in denoise(pipeline):
        yield out


async def infer_program_2_b(strength: float):
    width, height = POEM_OF_MALAYA_SIZE

    def pipeline(on_step_end):
        return img2img(
            prompt=PROMPT_2B,
            image=MALAYA,
            strength=strength,
            guidance_scale=GUIDANCE_SCALE_2B,
            num_inference_steps=STEPS,
            callback_on_step_end=on_step_end,
            callback_on_step_end_tensor_inputs=["latents"],
            width=width,
            height=height,
        )

    async for out in denoise(pipeline):
        yield out
