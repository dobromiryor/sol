import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { getMoonIllumination } from "../../utils/getMoonIllumination";
import { getMoonPhase } from "../../utils/getMoonPhase";
import { MoonIcon } from "../atoms/MoonIcon";
import { ScrollButtons } from "../atoms/ScrollButtons";

export const MoonPhaseCard = () => {
	const { data } = useWeatherStore();

	return (
		<li
			className="col-span-2 flex flex-col gap-1 py-4 bg-primary text-inverted-text dark:text-text rounded-xl text-sm"
			tabIndex={0}>
			<span className="px-4">Moon phase</span>

			<div className="flex gap-4 pl-4">
				<div className="flex-shrink-0 flex flex-col justify-between h-full">
					<div className="flex flex-col">
						<span className="text-xs text-inverted-text/75 dark:text-text/75">
							Moonrise
						</span>
						<span className="text-2xl">
							{new Date(
								getAdjustedTime(data.timezone_offset, data.daily[0].moonrise)
							).toLocaleTimeString("en-gb", { timeStyle: "short" })}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-xs text-inverted-text/75 dark:text-text/75">
							Moonset
						</span>
						<span className="text-2xl">
							{new Date(
								getAdjustedTime(data.timezone_offset, data.daily[0].moonset)
							).toLocaleTimeString("en-gb", { timeStyle: "short" })}
						</span>
					</div>
				</div>

				<ScrollButtons>
					<ul
						className={clsx(
							"flex justify-between items-center gap-4 max-w-full h-full overflow-x-scroll scrollbar-none snap-x snap-proximity transition-all pr-4",
							data.isFallback && "blur"
						)}
						aria-label="Moon phase list"
						tabIndex={0}>
						{data.daily.map((day, index) => (
							<li
								className="flex-grow flex-shrink-0 basis-12 flex flex-col gap-1 justify-center items-center"
								key={`Moon__Cycle__${day.dt}__${day.moon_phase}__${index}`}>
								<span className="text-xs text-center text-inverted-text/75 dark:text-text/75">
									{getMoonPhase(day.moon_phase)}
								</span>

								<MoonIcon lat={data.lat} phase={day.moon_phase} />

								<span
									aria-label={`${getMoonIllumination(
										day.moon_phase
									).toFixed()}% illumination`}
									className="text-xs">
									{getMoonIllumination(day.moon_phase).toFixed()}%
								</span>

								<time className="text-xs text-inverted-text/75 dark:text-text/75">
									{index === 0
										? "Today"
										: new Date(
												getAdjustedTime(data.timezone_offset, day.dt)
											).toLocaleDateString("en-gb", {
												day: "numeric",
												month: "short",
											})}
								</time>
							</li>
						))}
					</ul>
				</ScrollButtons>
			</div>
		</li>
	);
};
