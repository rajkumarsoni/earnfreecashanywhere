import { Component, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
	selector: 'spin-wheel',
	templateUrl: 'spin-wheel.html'
})
export class SpinWheelComponent {

	@ViewChild('chart')
	private chartContainer: ElementRef;

	@Output() winningNumbers = new EventEmitter();
	@Input() spinWheelData;
	constructor() {

	}

	ngAfterViewInit() {
		this.loadWheel();
	}

	loadWheel() {
    let earnedPoints = this.winningNumbers;
		let nums: number = 0,
			padding = { top: 20, right: 40, bottom: 0, left: 0 },
			w = 250 - padding.left - padding.right,
			h = 250 - padding.top - padding.bottom,
			r = Math.min(w, h) / 2,
			rotation = 0,
			oldrotation = 0,
			picked = 100000,
			oldpick = [],
			color = d3.scale.category20();//category20c()


		let chart = this.chartContainer.nativeElement;
		let svg = d3.select(chart)
			.append("svg")
			.data([this.spinWheelData])
			.attr("width", w + padding.left + padding.right)
			.attr("height", h + padding.top + padding.bottom);
		let container = svg.append("g")
			.attr("class", "chartholder")
			.attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
		let vis = container
			.append("g");

		let pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
		// declare an arc generator function
		let arc = d3.svg.arc().outerRadius(r);
		// select paths, use arc generator to draw
		let arcs = vis.selectAll("g.slice")
			.data(pie)
			.enter()
			.append("g")
			.attr("class", "slice");

		arcs.append("path")
			.attr("fill", function (d, i) { return color(i); })
			.attr("d", function (d) { return arc(d); });
		// add the text
		arcs.append("text").attr("transform", function (d) {
			d.innerRadius = 0;
			d.outerRadius = r;
			d.angle = (d.startAngle + d.endAngle) / 2;
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (80) + ")";
		})
      .attr("text-anchor", "end")
      .attr("style", "font-size:18px")
			.text(function (d, i) {
				console.log("spinWheelData", d);
				return d.data;
      });
    container.on("click", spin);

		function spin(d, emitFunction) {
			let ps = 360 / d.length,
				pieslice = Math.round(1440 / d.length),
				rng = Math.floor((Math.random() * 1440) + 360);

			rotation = (Math.round(rng / ps) * ps);

			picked = Math.round(d.length - (rotation % 360) / ps);
			picked = picked >= d.length ? (picked % d.length) : picked;

			oldpick.push(picked);

			rotation += 90 - Math.round(ps / 2);

			nums = d[picked];

			vis.transition()
				.duration(3000)
				.attrTween("transform", rotTween)
				.each("end", function () {
					d3.select(".slice:nth-child(" + (picked + 1) + ") path");
				//	d3.select("#question h6")
					//	.text(nums);
					oldrotation = rotation;
          earnedPoints.emit(nums)
				});

    }

		//make arrow
		svg.append("g")
			.attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
			.append("path")
			.attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
			.style({ "fill": "black" });
		//draw spin circle
		container.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", 30)
			.style({ "fill": "white", "cursor": "pointer" });
		//spin text
		container.append("text")
			.attr("x", 0)
			.attr("y", 2)
			.attr("text-anchor", "middle")
			.text("Spin")
			.style({"font-size": "16px" });


		function rotTween(to) {
			let i = d3.interpolate(oldrotation % 360, rotation);
			return function (t) {
				return "rotate(" + i(t) + ")";
			};
		}
	}

}
