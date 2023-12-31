function rutInitPage() {
	$('[data-toggle="tooltip"]').tooltip(), rutInitArea("body")
}

function rutInitArea(e) {
	var t = e;
	if ("undefined" == typeof rut && (console.log("1 init: in undefined"), rut = {
			browser: null,
			powerTableIndex: [],
			powerTableInActiveSortSettings: null
		}), null == rut.browser) {
		var r = !!(window.chrome && window.chrome.webstore || /Google Inc/.test(navigator.vendor)),
			n = "undefined" != typeof InstallTrigger,
			l = !(!r && !n);
		rut.browser = {
			hasOwnDatePicker: l,
			usesIsoDate: l,
			suppressOwnDatePicker: !1,
			typeConversionNumToTel: l,
			checkNumberKeypress: !0,
			checkTimeKeypress: !l,
			checkTelKeypress: !0,
			isModern: l,
			isChrome: r,
			isFirefox: n
		}, rut.rclServletPackedParamKey = "params", rut.rclServletParamDelimiter = "$$$", rut.rclServletEqDelimiter = "~~"
	}
	"body" != e ? t = "#" + e : (t = "body", document.body.addEventListener("keydown", rutCheckKeydown), $(".collapse").on("show.bs.collapse", function (e) {
		rutHandleCollapseEvent(e)
	}), $(".collapse").on("hide.bs.collapse", function (e) {
		rutHandleCollapseEvent(e)
	}));
	var i = "",
		a = "",
		o = "",
		s = NaN;
	$(t).find("input").each(function () {
		if (o = this.getAttribute("data-type"), i = this.getAttribute("type"), this.getAttribute("readonly"), this.disabled, "text" == i && "time" != o && "date" != o) this.addEventListener("keypress", rutCheckTextKeypress);
		else if ("number" == i || "number" == o) {
			if (rut.browser.isModern && (this.type = "tel", this.setAttribute("data-type", "number")), this.addEventListener("keydown", rutCheckNumberKeypress), null != (a = this.getAttribute("data-check")) && a.indexOf("dec(") >= 0) {
				var e = (a = a.substring(e + 4)).indexOf(")"),
					t = a.indexOf(",");
				if (e <= t) return !0;
				if (NaN == (s = Number(a.substring(t + 1, e)))) return !0;
				if (s < 0) return !0;
				this.addEventListener("change", function (e) {
					rutChangeDecimal(e)
				})
			}
		} else if ("date" == i || "text" == i && "date" == o) {
			this.type = "text", this.setAttribute("data-type", "date"), $("#" + this.id).removeClass("hasDatepicker"), $("#" + this.id).datepicker({
				showOtherMonths: !0,
				selectOtherMonths: !0,
				dateFormat: "dd/mm/yy",
				onSelect: function () {
					var e = document.createEvent("Event");
					e.initEvent("change", !0, !0), this.dispatchEvent(e)
				},
				beforeShow: function (e) {
					if ($(e).attr("readonly")) return !1
				}
			}).keypress(rutFormatDateFieldOnTyping), this.addEventListener("blur", rutValidateDateField);
			var r = $("#" + this.id).attr("data-defaultvalue");
			null != r && (this.value = rutConvertDate(r, !1))
		} else "tel" == i && "number" != o ? rut.browser.checkTelKeypress && this.addEventListener("keypress", rutCheckTelKeypress) : "time" != i && "time" != o || (null != this.defaultValue && (this.value = rutConvertTime(this.value, !1), this.defaultValue = this.value), this.type = "text", this.maxLength = 5, this.setAttribute("data-type", "time"), this.addEventListener("keypress", rutCheckTimeKeypress), this.addEventListener("blur", rutFullFillTime))
	}), rutInitAreaWithSliders(e), rutInitAreaWithMultiSelect(e)
}

function rutFullFillTime() {
	var e = this.value;
	"" != e && (e = e.replace(":", "") + "0000", this.value = e.substring(0, 2) + ":" + e.substring(2, 4))
}

function rutFormatDateFieldOnTyping(e) {
	"8" != e.keyCode && (2 == e.target.value.length && (e.target.value = e.target.value + "/"), 5 == e.target.value.length && (e.target.value = e.target.value + "/"))
}

function rutValidateDateField(e) {
	if (e.target.value) {
		var t = e.target.value.replace(/[^0-9]/g, "");
		8 != t.length ? e.target.focus() : rutSetElementValue(e.target.id, t.substring(0, 2) + "/" + t.substring(2, 4) + "/" + t.substring(4, 8))
	}
}

function rutChangeDecimal(e) {
	var t = e.target;
	t.value = rutFormatNumberForElement(t, t.value) || ""
}

function rutGetNumberSettings(e) {
	var t, r, n = e.getAttribute("data-check");
	if (null == n) return null;
	var l = n.indexOf("dec(");
	if (l < 0) return null;
	l = (n = n.substring(l + 4)).indexOf(")");
	var i = n.indexOf(",");
	return l <= i ? null : (t = Number(n.substring(i + 1, l)), r = Number(n.substring(0, i)), NaN == t ? null : t < 0 ? null : {
		precision: r,
		scale: t
	})
}

function rutCheckMinMaxValue(e) {
	var t = e.target,
		r = t.value;
	return null != t.min && !isNaN(t.min) && "" != t.min && Number(r) < t.min ? (rutOpenMessageBox("Error", "Entered value " + r + "<" + t.min + " (expected minimum)", "rut003-003", "", ""), rutSetElementValue(t, t.min), void e.preventDefault()) : null != t.max && !isNaN(t.max) && "" != t.max && Number(r) > t.max ? (rutOpenMessageBox("Error", "Entered value " + r + ">" + t.max + " (expected maximum)", "rut003-004", "", ""), rutSetElementValue(t, t.max), void e.preventDefault()) : void 0
}

function rutFormatNumberForElement(e, t) {
	if (void 0 === t || null == t) return "";
	var r = t.toString(),
		n = rutGetNumberSettings(e),
		l = "";
	if (!n) return r;
	if ("" == (r = r.replace(/,/g, "")).replace(".", "")) return "";
	var i = r.indexOf(".");
	if (i >= 0) {
		var a = r.substring(i + 1, r.length) + "00000000000";
		a = a.substring(0, n.scale), l = 0 == n.scale ? ("" == r.substring(0, i) ? "0" : r.substring(0, i)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ("" == r.substring(0, i) ? "0" : r.substring(0, i)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + a
	} else l = 0 == n.scale ? r.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : r.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".000000000".substring(0, n.scale + 1);
	return l
}

function rutCheckTextKeypress(e) {
	var t = e.target.maxLength,
		r = e.target.value,
		n = e.target,
		l = n.selectionStart,
		i = n.selectionEnd;
	if (r.length + l - i >= t && -1 != t && 0 > "8,46,37,39".indexOf(e.keyCode)) return e.preventDefault(), !1;
	if (e.which >= 97 && e.which <= 122) {
		let t = n.getAttribute("data-check");
		if (null != t && t.indexOf("upc") >= 0)
			if (i < e.target.value.length ? e.target.value = r.substring(0, l) + String.fromCharCode(e.which - 32) + r.substring(i, r.length) : e.target.value = r + String.fromCharCode(e.which - 32), n.selectionStart = n.selectionEnd = l + 1, e.preventDefault(), null != rptGetParentIds(n).parentContainerId)
				if ("createEvent" in document) {
					var a = document.createEvent("HTMLEvents");
					a.initEvent("change", !0, !0), n.dispatchEvent(a)
				} else n.fireEvent("onchange")
	}
}

function rutCheckNumberKeypress(e) {
	var t = e.target,
		r = t.getAttribute("data-check"),
		n = 20,
		l = 0,
		i = t.value,
		a = t.min,
		o = t.max,
		s = i ? i.length : 0,
		u = t.selectionStart,
		d = t.selectionEnd;
	if (null != r) {
		var c = r.indexOf("dec(");
		c >= 0 && (r = (r = (r = r.substring(c + 4)).split(")")[0]).split(","), NaN == (n = Number(r[0])) && (n = 20), NaN == (l = Number(r[1])) && (l = 0))
	}
	var p = i.indexOf("."),
		h = i.indexOf("-") >= 0 || "-" == i,
		f = (p < 0 || i.length, p < 0 ? i.length : p);
	if (f = h ? f - 1 : f, e.keyCode < 48) {
		rutGetElementValue(t.id);
		let r = t.getAttribute("step");
		if (r = null != r ? Number(r) : 1, 38 == e.keyCode || 33 == e.keyCode) rutSpinnerIncrement(t.id, 1);
		else {
			if (40 != e.keyCode && 34 != e.keyCode) return !0;
			rutSpinnerIncrement(t.id, -1)
		}
	}
	if ("-" == e.key && u > 0) return e.preventDefault(), !1;
	if ("-" == e.key && a >= 0 && null != t.getAttribute("min")) return e.preventDefault(), !1;
	if ("." == e.key && (l = 0)) return e.preventDefault(), !1;
	if (0 == l && n + (h ? 1 : 0) < s + 1 + u - d) return e.preventDefault(), !1;
	if ("." == e.key && d < p) return e.preventDefault(), !1;
	if ("." == e.key && u > p && p >= 0) return e.preventDefault(), !1;
	if (e.keyCode > 57 && "-" != e.key && "." != e.key) return e.preventDefault(), !1;
	if (p > 0 && u > p && l < u - p + u - d) return e.preventDefault(), !1;
	if (p >= u && n - l + (h ? 1 : 0) < 1 + p + u - d) return e.preventDefault(), !1;
	if (-1 == p && n - l + (h ? 1 : 0) < 1 + s + u - d && (h || "-" != e.key || 0 != u)) return e.preventDefault(), !1;
	if (h && 0 == u && 1 == d && n - l == f) return e.preventDefault(), !1;
	if (1 == a && 0 == u && "0" == e.key) return e.preventDefault(), !1;
	if (void 0 !== o && null != o && "" != o && !isNaN(o)) {
		if (Number(i.substring(0, u) + e.key + i.substring(d)) > o) return e.preventDefault(), !1
	}
}

function rutCheckTimeKeypress(e) {
	var t = e.target,
		r = t.value,
		n = t.selectionStart;
	if (0 == n) {
		if (0 > "012".indexOf(e.key)) return e.preventDefault(), !1
	} else {
		if (1 == n) return 0 <= "01".indexOf(r.charAt(0)) && 0 > "0123456789".indexOf(e.key) ? (e.preventDefault(), !1) : "2" == r.charAt(0) && 0 > "0123".indexOf(e.key) ? (e.preventDefault(), !1) : (t.value = r.charAt(0) + e.key + ":" + r.substring(3), e.preventDefault(), !1);
		if (2 == n) {
			if (":" != e.key) return e.preventDefault(), !1
		} else if (3 == n) {
			if (0 > "012345".indexOf(e.key)) return e.preventDefault(), !1
		} else {
			if (4 != n) return e.preventDefault(), !1;
			if (0 > "0123456789".indexOf(e.key)) return e.preventDefault(), !1
		}
	}
}

function rutCheckTelKeypress(e) {
	if (8 == e.which) return !0;
	var t = e.target.value,
		r = e.target.selectionStart,
		n = e.key;
	return "+" == (n = "Spacebar" == n ? " " : n) && 0 == r || (0 > "0123456789 -".indexOf(n) ? (e.preventDefault(), !1) : 0 <= "+ -".indexOf(n) && r > 0 && 0 <= "+ -".indexOf(t.charAt(r - 1)) ? (e.preventDefault(), !1) : 0 <= "+ -".indexOf(n) && r < t.length - 1 && 0 <= "+ -".indexOf(t.charAt(r + 1)) ? (e.preventDefault(), !1) : void 0)
}

function rutCheckArea(e, t) {
	var r = [],
		n = $("#" + e);
	return n.attr("class").indexOf("tblArea") > -1 && (n = n.children(":not(.tblRow)").add(n.children(".tblRow:not(:last)"))), (n = t ? n.find("input:visible, select:visible") : n.find("input, select")).each(function () {
		!this.required || null != this.value && "" != this.value.trim() || r.push([this.id, document.body.id + "-001", "missing value", _findElementLabel(this.id)])
	}), r
}

function rutResetToDefault(e) {
	$("#" + e).find("input[id^=" + e.substr(0, 2) + "]").each(function () {
		"checkbox" === this.type ? this.checked = this.defaultChecked : "radio" === this.type ? this.checked = this.defaultChecked : this.value = this.defaultValue
	}), $("#" + e).find("select[id^=" + e.substr(0, 2) + "]").each(function () {
		$(this).find("option").each(function () {
			this.selected = this.defaultSelected
		})
	}), $("#" + e).find("textarea[id^=" + e.substr(0, 2) + "]").each(function () {
		this.value = this.defaultValue
	})
}

function _rutPrepareInputForGetLookupData(e, t, r, n, l, i) {
	for (var a = t ? t.split(" ") : [], o = [], s = 0; s < a.length; s++) {
		(S = a[s].indexOf("*")) >= 0 ? (o.push(a[s].substring(0, S)), a[s] = _rutParseLookupSelectProcessor(a[s].substring(S + 1))) : (o.push(a[s]), a[s] = void 0)
	}
	var u = null,
		d = r ? r.split(" ") : [],
		c = n ? n.split(" ") : [],
		p = [],
		h = null,
		f = null,
		m = null,
		g = null,
		v = null,
		b = null;
	for (s = 0; s < d.length; s++)
		if ("" != o[s] && "" != d[s]) {
			if (f = null == (h = document.getElementById(rutSplitRowID(d[s]))) ? d[s] : rutGetElementValue(h), g = null, (u = a[s]) && u.min && "string" == typeof f && f.length < u.min) throw {
				code: "rut010-001",
				message: (null == h ? "Value" : _findElementLabel(h.id)) + " requires at least " + u.min + " character(s)"
			};
			if (null != h) {
				if (null == f || "" == f) continue;
				"INPUT" == h.nodeName ? (g = h.type, "number" == (g = null == h.getAttribute("data-type") ? h.type : h.getAttribute("data-type")) ? null != (v = h.getAttribute("data-check")) && (b = v.indexOf("dec(")) >= 0 && (g = (v = v.substring(b)).split(")")[0]) : f = "date" == g ? "'" + (f = f.replace(/\-/g, "")) + "'" : "time" == g ? rutConvertTime(f, !1) : "'" + f + "'") : (g = "unknown", f = "'" + f + "'")
			}
			m = u && u.main ? i ? "=" : "LIKE" : s >= c.length ? "=" : c[s], g ? p.push({
				column: o[s],
				value: f,
				operator: m,
				dataType: g
			}) : p.push({
				column: o[s],
				value: f,
				operator: m
			})
		}
	var y = {
			userToken: rutGetElementValue("h3-userToken"),
			userId: rutGetElementValue("h3-userId"),
			line: rutGetElementValue("h3-line"),
			trade: rutGetElementValue("h3-trade"),
			agent: rutGetElementValue("h3-agent"),
			fscCode: rutGetElementValue("h3-fscCode")
		},
		x = {
			userToken: y.userToken,
			userData: y,
			table: e
		};
	if (p.length > 0 && (x.select = p), l) {
		var w = [],
			k = l.split(" ");
		for (s = 0; s < k.length; s++) {
			var S;
			if ((S = k[s].indexOf("*")) >= 0) {
				var O = k[s].substring(S + 1);
				w.push({
					column: k[s].substring(0, S),
					type: O
				})
			}
		}
		w.length > 0 && (x.processor = w)
	}
	return x
}

function rutOpenLookupTable(e, t, r, n, l, i, a) {
	var o = a || rutToTitleCase(e.substring(4) + " Lookup"),
		s = null;
	try {
		s = _rutPrepareInputForGetLookupData(e, n, l, i, t, !1)
	} catch (e) {
		return void rutOpenMessageBox("Warning", e.message, e.code, null, "")
	}
	return t = t.replace(/\*\w*/g, ""), $("body").append('<div class="loading"></div>'), void rutGetLookupData(s, function (e) {
		var n = e.data,
			l = e.metadata;
		if (n.length <= 0) return void rutOpenMessageBox("Warning", "No row(s) retrieved", "");
		var i = document.getElementById("t99Lookup-dlg");
		null != i && i.parentNode.removeChild(i);
		for (var a = "", s = "", u = "", d = [], c = [], p = 100, h = 0, f = 0, m = 0; m < l.length; m++) f = Math.min(9 * Math.max(l[m].precision, l[m].columnName.length), 200), f = Math.max(f, 72), d.push(f), c.push(f + "px;"), "HIDE_" != l[m].columnName.substring(0, 5).toUpperCase() && (h++, p += f);
		var g = 8 * (1 + h) + p + 17;
		if (g < 550) {
			var v = p;
			p = 0;
			var b = 533 - 8 * (1 + h) - 50;
			v -= 50;
			for (var m = 0; m < c.length; m++) d[m] = 1 * d[m] / v * b, c[m] = d[m] + "px;", "HIDE_" != l[m].columnName.substring(0, 5).toUpperCase() && (p += d[m]);
			g = 550
		}
		a += '<div id="t99Lookup-dlg">';
		var y = null,
			x = null;
		a += '<div style="padding:2px;"><table><tr><td><label class="col-sm1 bt-1" for="t99Lookup-dlgSearch">Search</label></td><td colspan=2> <input class="col-sm2" type="text" id="t99Lookup-dlgSearch" ></input></td></tr></table>', a += "</div>", a += "<div>", a += '<div id="t99LookupHeaderWrapper" style="overflow-x:hidden; padding-right:15px;">', a += '<div id="t99HeaderRow" class="rcl-lkHeader" style="min-width:' + g + "px;width:" + g + 'px">', a += '<p class="rcl-lkHeaderRow">', a += '<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px; text-align:center;">Seq#</span>', a += '<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px; text-align:center;">Select</span>';
		for (var w = null, m = 0; m < l.length; m++) u = "HIDE_" == l[m].columnName.substring(0, 5).toUpperCase() ? 'class="rcl-lkHeaderCell d-none"' : 'class="rcl-lkHeaderCell"', w = rutToTitleCase(l[m].columnName), a += "<span " + u + ' style="flex-basis:' + c[m] + "max-width:" + c[m] + '; text-align:center;">' + w + "</span>";
		a += "</p>", a += '<p class="rcl-lkHeaderRow">\r\n<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;"></span>', a += '<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;"></span>';
		for (var m = 0; m < l.length; m++) w = rutToTitleCase(l[m].columnName), u = "HIDE_" == l[m].columnName.substring(0, 5).toUpperCase() ? 'class="rcl-lkHeaderCell d-none" ' : 'class="rcl-lkHeaderCell"', y = '"t99Lookup-dlgAsc-' + (m + 1) + '"', x = '"t99Lookup-dlgDes-' + (m + 1) + '"', a += "<span " + u + ' style="flex-basis:' + c[m] + "max-width:" + c[m] + '"> <button id=' + y + ' class="rclDlgSortDirectionBtn" style="font-size:10px;width:30px;text-align:center;margin:0;" data-toggle="tooltip" data-placement="top" title="Sorts by ascending values of ' + w + '. Existing sorts are expanded." onclick=\'rptInjectSortDef("t99Lookup", ' + y + ', "' + l[m].columnName + "\", 1); '>∧</button>", a += "<button id=" + x + ' class="rclDlgSortDirectionBtn" style="font-size:10px;width:30px;text-align:center;margin:0;" data-toggle="tooltip" data-placement="top" title="Sorts by descending values of ' + w + '. Existing sorts are expanded." onclick=\'rptInjectSortDef("t99Lookup", ' + x + ', "' + l[m].columnName + "\", -1); '>∨</button></span>";
		a += "</p>", a += "</div>", a += "</div>\r\n", a += '<div id="t99Lookup" class="tblArea">', a += '<div id="t99LookupDetailWrapper" class="rcl-lkArea" style="overflow-x:scroll;" ', a += 'onScroll="', a += "var head = document.getElementById('t99LookupHeaderWrapper');", a += "var detail = document.getElementById('t99LookupDetailWrapper');", a += "head.scrollLeft = detail.scrollLeft;", a += "if(head.scrollLeft < detail.scrollLeft) detail.scrollLeft = head.scrollLeft;", a += "if(head.scrollLeft > detail.scrollLeft) head.scrollLeft = detail.scrollLeft;", a += '" >', a += '<div style="min-width:' + g + "px;width:" + g + 'px;">', a += '<p id="t99Row" class="tblRow rcl-lkAreaRow" >', a += '<span id="t99lkindex" class="tblField rcl-lkAreaCell" style="flex-basis:50px;min-width:50px;max-width:50px;"></span>', a += '<span class="rcl-lkAreaCell" style="flex-basis:50px;min-width:50px;max-width:50px;"><button id="t99SelectButton" class="rclDlgSortDirectionBtn" onclick="rutSelectLookupEntry(\'t99Lookup-dlg\',\'' + t + "','" + r + "')\">select</button></span>";
		for (var m = 0; m < l.length; m++) {
			if (s = style = 'style="flex-basis:' + c[m] + "max-width:" + c[m] + '"', 0 <= "-5,4,5,-6,2,6,8".indexOf(l[m].columnType)) style = 'data-type="number" data-check="dec(' + l[m].precision + "," + l[m].scale + ')" ';
			else if (10 == l[m].precision)
				for (var k = 0; k < Math.min(10, n.length); k++)
					if (value = n[k][l[m].columnName], value) {
						if (10 == value.length && "-" == value.charAt(4) && "-" == value.charAt(7)) {
							style = 'data-type="date" ' + s;
							break
						}
					} else;
			else style = s;
			style != s && (s += " " + style), u = "HIDE_" == l[m].columnName.substring(0, 5).toUpperCase() ? 'class="tblField rcl-lkAreaCell d-none' : 'class="tblField rcl-lkAreaCell"', a += '<span id="t99' + l[m].columnName + '" ' + u + " " + s + "></span>"
		}
		a += "</p></div>", a += "</div>", n.length > 50 && (a += '<div id="t99paging" class="container-fluid" data-pageSize="50"></div>');
		a += "</div>", a += "</div>", $("body").append(a), tableSettings = rptTableInit("t99Lookup"), document.getElementById("t99Lookup" + tableSettings.configuration.sortDialogSearchFieldSuffix).addEventListener("keypress", function (e) {
			"Enter" === e.key && _rptCallSearch("t99Lookup")
		});
		var S = .8 * $(window).width(),
			O = g + 52;
		O = Math.min(S, Math.max(550, O)), $("#t99Lookup-dlg").dialog({
			autoOpen: !1,
			modal: !0,
			draggable: !0,
			resizable: !1,
			width: O,
			height: "auto",
			title: o,
			buttons: [{
				text: "Search",
				click: function () {
					_rptCallSearch("t99Lookup")
				},
				class: "rclLookupDlgBtn"
			}, {
				text: "Reset Search",
				click: function () {
					rptResetSearch("t99Lookup")
				},
				class: "rclLookupDlgBtn"
			}, {
				text: "Reset Sort",
				click: function () {
					rptResetSortDefinitions("t99Lookup")
				},
				class: "rclLookupDlgBtn"
			}, {
				text: "Export to csv",
				click: function () {
					rptSaveAsCsv("t99Lookup")
				},
				class: "rclLookupDlgBtn"
			}, {
				text: "Cancel",
				click: function () {
					rutCloseDialog("t99Lookup-dlg")
				},
				class: "rclLookupDlgBtn"
			}],
			open: function (e, t) {
				rptAddData("t99Lookup", n), rptDisplayTable("t99Lookup"), $(this).css("overflow", "hidden")
			},
			close: function (e, t) {
				rutCloseLookupPopoverDialog("t99Lookup-dlg", "t99Lookup")
			}
		}), $("#t99Lookup-dlg").dialog("open")
	})
}

function rutLookupByKey(e, t, r, n, l, i, a) {
	if (void 0 !== a && null != a && "" != a) {
		let e = rutGetElementValue(a = rutSplitRowID(a));
		if (null == e || "" == e.trim()) {
			let e = r.split(" ");
			for (var o = 0; o < e.length; o++) {
				var s = rutSplitRowID(e[o]).trim();
				s != a && "" != s && rutSetElementValue(s, "")
			}
			return
		}
	}
	var u = null;
	try {
		u = _rutPrepareInputForGetLookupData(e, n, l, i, t, !0)
	} catch (e) {
		return
	}
	t = t.replace(/\*\w*/g, ""), rutGetLookupData(u, function (e) {
		var n = e.data,
			l = e.metadata,
			i = t.split(" "),
			o = r.split(" ");
		if (n.length <= 0) {
			rutOpenMessageBox("Warning", "No row(s) retrieved", "rut003-001");
			for (var s = 0; s < o.length; s++) {
				var u = rutSplitRowID(o[s]);
				a != u && rutSetElementValue(u, "")
			}
			return
		}
		if (1 == n.length) {
			for (var d = [], s = 0; s < i.length; s++)
				if ("" != i[s])
					for (var c = 0; c < l.length; c++)
						if (l[c].columnName == i[s] && o[s] && "*" != o[s]) {
							var p = rutSplitRowID(o[s]);
							rutSetElementValue(p, n[0][l[c].columnName]), d.push($("#" + p)[0]);
							break
						}
			for (var s = 0; s < d.length; s++) {
				var h = document.createEvent("Event");
				h.initEvent("change", !0, !0), d[s].dispatchEvent(h)
			}
		} else
			for (var s = 0; s < o.length; s++) {
				var u = rutSplitRowID(o[s]);
				a != u && rutSetElementValue(u, "")
			}
	})
}

function rutCloseLookupPopoverDialog(e, t) {
	rutCloseDialog(e), $("#" + e).remove();
	var r = document.getElementById(e);
	if (null != r && r.parentNode.removeChild(r), null != t)
		for (var n = 0; n < rut.powerTableIndex.length; n++)
			if (rut.powerTableIndex[n].containerId == t) {
				rut.powerTableIndex.splice(n, 1);
				break
			}
}

function rutCloseDialog(e) {
	$("#" + e).dialog("close")
}

function rutGetElementValue(e) {
	var t = null,
		r = null,
		n = !1;
	if ("string" == typeof e) {
		if (null == (t = document.getElementById(e))) {
			var l = e.lastIndexOf("-"),
				i = "",
				a = e;
			return l > 2 ? (a = e.substring(0, l), l -= e.length, i = e.slice(l)) : l = 0, $("input").each(function () {
				return "radio" != this.type || (a != this.id.split("#")[0] || (l < 0 && i != this.id.slice(l) || (n = !0, this.checked ? (r = this.value, !1) : void 0)))
			}), 1 == n ? r : null
		}
	} else t = e;
	if (tag = null == t ? null : t.nodeName || null, null == tag) return alert("rutSetElementValue: element " + JSON.stringify(t) + " of elementId:" + e + " is not an html element"), null;
	var o = t.getAttribute("data-type") || " ";
	return "INPUT" == tag ? ("text" == t.type || "usernamer" == t.type || "password" == t.type || "date" == t.type || "email" == t.type || "url" == t.type || "time" == t.type ? r = t.value : "number" == t.type || "tel" == t.type ? (r = t.value) && (r = r.replace(/,/g, "")) : "radio" == t.type ? r = t.checked ? t.value : "" : "checkbox" == t.type && (r = t.checked ? "Y" : ""), "number" == o ? t.value && (r = t.value.replace(/,/g, "")) : r = "date" == o ? rutConvertDate(r, !0) || "" : "time" == o ? rutConvertTime(r, !0) || "" : r || "") : "TEXTAREA" == tag ? r = t.value : "SELECT" == tag ? t.options.length > 0 && -1 !== t.selectedIndex && (r = t.options[t.selectedIndex].value) : r = "DIV" == tag && "bt-slider" == t.getAttribute("data-ct") ? rutSliderGetValue(t.id) : t.textContent, r
}

function rutSetElementValue(e, t) {
	var r, n = null,
		l = !1;
	if ("string" == typeof e) {
		if (null == (n = document.getElementById(e))) {
			var i = e.lastIndexOf("-"),
				a = "",
				o = e;
			return i > 2 ? (o = e.substring(0, i), i -= e.length, a = e.slice(i)) : i = 0, $("input").each(function () {
				return "radio" != this.type || (o != this.id.split("#")[0] || (i < 0 && a != this.id.slice(i) || (l = !0, void(this.value == t ? this.checked = !0 : this.checked = !1))))
			}), 0 == l ? (alert('rutSetElementValue: elementId "' + e + '" does not exist'), null) : null
		}
	} else n = e;
	r = n.nodeName || null;
	var s = n.getAttribute("data-type") || " ";
	if (null == r) return alert('rutSetElementValue: elementId "' + e + '" does not have a tag'), null;
	"INPUT" == r ? "text" == n.type || "usernamer" == n.type || "password" == n.type || "date" == n.type || "datetime-local" == n.type || "email" == n.type || "tel" == n.type && "number" != s || "url" == n.type || "time" == n.type ? (n.value = t || "", "number" == s ? n.value = rutFormatNumberForElement(n, t) || "" : "date" == s ? n.value = rutConvertDate(t, !1) || "" : "time" == s ? n.value = rutConvertTime(t, !0) || "" : null != n.getAttribute("data-ct") && n.getAttribute("data-ct").indexOf("bt-multiSelect") > -1 ? rutSetMultiSelectValue(n.id, t) : n.value = t || "") : "number" == n.type || "number" == s ? n.value = rutFormatNumberForElement(n, t) || "" : "radio" == n.type ? t == n.value ? n.checked = !0 : n.checked = !1 : "checkbox" == n.type && (n.checked = "Y" == t) : "TEXTAREA" == r ? n.value = t || "" : "SELECT" == r ? $(n).find("option").each(function () {
		t === $(this).val() ? this.selected = !0 : this.selected = !1
	}) : "number" == s ? n.textContent = rutFormatNumberForElement(n, t) || "" : "date" == s ? n.textContent = rutConvertDate(t, !1) || "" : "time" == s ? n.textContent = rutConvertTime(t, !0) || "" : "DIV" == r && "bt-slider" == n.getAttribute("data-ct") ? rutSliderSetValue(n.id, t) : n.textContent = t || ""
}

function rutSelectLookupEntry(e, t, r) {
	for (var n = document.activeElement, l = rptGetParentIds(n), i = rptGetTableSettings(l.parentContainerId).idPrefix, a = l.parentRowId.split("-"), o = "-" + a[a.length - 1], s = t.split(" "), u = r.split(" "), d = null, c = [], p = 0; p < s.length; p++)
		if ("" != s[p] && u[p] && "*" != u[p]) {
			d = document.getElementById(i + s[p] + o), fid = i + s[p] + o, d = document.getElementById(fid);
			var h = rutSplitRowID(u[p]);
			rutSetElementValue(h, rutGetElementValue(d)), c.push($("#" + h)[0])
		}
	for (p = 0; p < c.length; p++) {
		var f = document.createEvent("Event");
		f.initEvent("change", !0, !0), c[p].dispatchEvent(f)
	}
	rutCloseLookupPopoverDialog(e, l.parentContainerId)
}

function rutToggle(e, t) {
	var r = $("#" + t).is(":visible");
	$("#" + t).slideToggle("slow"), !0 === r ? $("#" + e).text("Expand") : $("#" + e).text("Collapse")
}

function rutOpenPopoverDialog(e, t, r, n, l, i) {
	if (void 0 !== i && null != i && "" != i) {
		let e = rutGetElementValue(i);
		if (null == e || "" == e) return
	}
	var a = l || rutToTitleCase(e.substring(4) + " Details"),
		o = null;
	try {
		o = _rutPrepareInputForGetLookupData(e, t, r, n, null, !0)
	} catch (e) {
		return
	}
	return void rutGetLookupData(o, function (e) {
		if (!e) return;
		var t = e.data,
			r = e.metadata;
		if (0 == t.length) return void rutOpenMessageBox("Lookup Error", "No data found", "rut003-001", null, "");
		if (t.length > 1) return void rutOpenMessageBox("Lookup Error", "More than one record found", "rut003-001", null, "");
		t = t.length > 0 ? t[0] : t;
		Object.getOwnPropertyNames(t);
		var n = document.body,
			l = [],
			i = 'style="border: #6A7896 1px solid;padding: 6px;"';
		l.push('<div id="d99Popover-dlg" class="dtlHeader" style="font-size: 10px;  border: #6A7896 1px solid;">'), l.push("<div></div>");
		var o = null,
			s = null;
		l.push('<table id="d99Detail" class="detailArea" >'), l.push("<thead><tr>"), l.push('<th class="rclPopoverColumnHdr rclPopoverCol1 ">Field</th><th class="rclPopoverColumnHdr rclPopoverCol2">Value</th>'), l.push("</tr>"), l.push("</thead>"), l.push("<tbody>");
		for (var u = null, d = -1, c = 0; c < r.length; c++) "HIDE_" != r[c].columnName.substring(0, 5).toUpperCase() && (u = ++d % 2 == 0 ? "rclPopoverElementEven" : "rclPopoverElementOdd", 0 <= "-5,4,5,-6,2,6,8".indexOf(r[c].columnType) ? (o = 'data-type="number" data-check="dec(' + r[c].precision + "," + r[c].scale + ')" ', s = 'style="border: #6A7896 1px solid;padding: 6px; text-align:right;"') : 10 == r[c].precision ? (value = t[r[c].columnName], 10 == value.length && "-" == value.charAt(4) && "-" == value.charAt(7) && (o = 'data-type="date" '), s = i) : (o = "", s = i), l.push("<tr><td " + i + ' class="rclPopoverLabel rclPopoverCol1 ' + u + '" >' + rutToTitleCase(r[c].columnName) + '</td><td id="d99' + r[c].columnName + '" class="dtlField rclPopoverElement rclPopoverCol2 ' + u + '" ' + o + s + " ></td></tr>"));
		l.push("</tr></tbody></table>"), l.push("</div>"), n.insertAdjacentHTML("afterbegin", l.join("\r\n")), rptDisplayDetailArea("d99Detail", t), $("#d99Popover-dlg").dialog({
			autoOpen: !1,
			draggable: !0,
			minWidth: 20,
			maxWidth: 300,
			minHeight: 50,
			maxHeight: 500,
			title: a,
			buttons: [{
				text: "Cancel",
				icon: "ui-icon-heart",
				click: function () {
					rutCloseLookupPopoverDialog("d99Popover-dlg")
				}
			}],
			close: function (e, t) {
				rutCloseLookupPopoverDialog("d99Popover-dlg")
			}
		}), $("#d99Popover-dlg").dialog("open")
	})
}

function rutOpenDialog(e) {
	$("#" + e).dialog("open")
}

function rutCloseDialog(e) {
	$("#" + e).dialog("close")
}

function rutToTitleCase(e) {
	for (var t = e.toLowerCase(); t.search("_") >= 0;) t = t.replace("_", " ");
	for (var r = t.split(" "), n = 0; n < r.length; n++) ";fsc;por;pol;pod;pot;del;plr;rcl;unno;imdg;dg;fcl;lcl;bb;oog;pot1;pot2;pot3;soc;coc;eta;etd;psn;lrs;".indexOf(";" + r[n] + ";") >= 0 ? r[n] = r[n].toUpperCase() : r[n] = r[n].substr(0, 1).toUpperCase() + r[n].substr(1);
	return r.join(" ")
}

function rutSendSupportEmail(e) {
	var t = document.body.id,
		r = null;
	void 0 !== rut.lastError && null !== typeof rut.lastError && (r = rut.lastError.code);
	var n = "DCS Issue:" + t + " - " + rutGetElementValue("h0-title") + (r ? " Last Error Code: " + r : ""),
		l = window.location.pathname;
	l.indexOf("#") >= 0 && (l = l.substring(0, l.indexOf("#")));
	var i = [],
		a = null;
	a = document.documentMode ? "IE 6-11" : window.chrome && window.chrome.webstore ? "Chrome 1+" : "undefined" != typeof InstallTrigger ? "Firefox 1.0+" : window.StyleMedia ? "Edge 20+" : window.opr && opr.addons || window.opera || navigator.userAgent.indexOf(" OPR/") >= 0 ? "Opera 8.0+" : /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || "undefined" != typeof safari && safari.pushNotification).toString() ? "Safari 3.0+" : "other", i.push("TO:Service Desk"), i.push("I have the following issue with DCS and would kindly ask for help:"), i.push("......................."), i.push("......................."), i.push(""), void 0 !== rut.lastError && null !== typeof rut.lastError && i.push("Last error: " + rut.lastError.code + " - " + rut.lastError.message), i.push(""), i.push(""), i.push(""), i.push(""), i.push(""), i.push("ANALYSIS DATA FOR SERVICE DESK"), i.push("Browser and localisation details"), i.push("-----------------------------------"), i.push("URL: " + l), i.push("Browser: " + a);
	i.push("Language: " + navigator.language + ", Decimal format: " + 1000.1.toLocaleString() + ", Offset to UTC time zone: " + (new Date).getTimezoneOffset()), i.push(""), i.push("Screen Details:"), i.push("-----------------------------------"), i.push("User:" + rutGetElementValue("h0-userData")), i.push("Screen: " + t + " - " + rutGetElementValue("h0-title")), i.push(""), i.push("Field Values:"), i.push("-----------------------"), $(".searchField").each(function () {
		i.push("id: " + this.id + ", value: " + rutGetElementValue(this.id))
	});
	var o = encodeURIComponent(i.join("\r\n"));
	window.open("https://outlook.office.com/?path=/mail/action/compose&to=itservicedesk@rclgroup.com&subject=" + n + "&body=" + o)
}

function rutSaveAsFile(e, t, r) {
	try {
		var n = new Blob([e], {
			type: r
		});
		saveAs(n, t)
	} catch (t) {
		window.open("data:" + r + "," + encodeURIComponent(e), "_blank", "")
	}
}

function rutCheckCodeQuality() {
	var e = ",",
		t = null,
		r = null,
		n = null,
		l = null,
		i = null,
		a = null,
		o = null,
		s = null,
		u = null,
		d = null,
		c = null,
		p = null,
		h = 0;
	0 <= navigator.language.indexOf("de") && (e = ";"), report = [], report.push("Code Quality Issue Report"), report.push(""), report.push("Issue#" + e + "Id" + e + "Description");
	for (var f = document.childNodes, m = 0, g = !1, v = !1, b = !1, y = !1, x = !1, w = !1, k = !1, S = !1, O = !1, E = 0; E < Math.min(f.length, 5); E++) f[E].nodeType == Node.COMMENT_NODE && (m++, f[E].textContent.indexOf("## DD/MM/YY") >= 0 && (g = !0), f[E].textContent.indexOf("User") >= 0 && (b = !0), f[E].textContent.indexOf("TaskRef") >= 0 && (v = !0), f[E].textContent.indexOf("Short Description") >= 0 && (y = !0), f[E].textContent.indexOf("Copyright RCL Public Co.") >= 0 && (x = !0), f[E].textContent.indexOf("Author") >= 0 && (w = !0), f[E].textContent.indexOf("Change Log") >= 0 && (k = !0));
	0 == m && report.push("rut002-180" + e + e + "Initial comment with changelog and copyright missing"), x || report.push("rut002-181" + e + e + "Initial comment has no copyright remark (Copyright RCL Public Co.)"), w || report.push("rut002-182" + e + e + "Initial comment has no author (Author)"), k || report.push("rut002-183" + e + e + "Initial comment has no change log (Change Log)"), g || report.push("rut002-184" + e + e + "Initial comment has no date column in change log (## DD/MM/YY)"), b || report.push("rut002-185" + e + e + "Initial comment has no user column in change log (User)"), v || report.push("rut002-186" + e + e + "Initial comment has no TaskRef column in change log (TaskRef)"), y || report.push("rut002-187" + e + e + "Initial comment has no description column in change log (Short Description)"), (t = document.body).id || report.push("rut002-101" + e + e + "<body> has no id. Should be screen id");
	var C = null,
		I = !1;
	$("div").each(function () {
		d = (t = this).getAttribute("data-ct") || " ", C && (C.contains("rcl-standard-navigation-bar") && d.indexOf("tabGroup") < 0 ? (r = this.id ? this.id : "<id is missing>", report.push("rut002-429" + e + r + e + "<div> Tab groups should use custom tag <rcl:tabGroup>")) : C.contains("tab-pane") && d.indexOf("tabContentPane") < 0 && (r = this.id ? this.id : "<id is missing>", report.push("rut002-430" + e + r + e + "<div> Tab panes should use custom tag <rcl:tabContentPane>")))
	}), $("input, select, textarea").each(function (f) {
		if (t = this, n = this.nodeName.toLowerCase(), I = !1, !this.id) {
			for (var m, g = [], v = 0, b = this.attributes, y = b.length; v < y; v++) m = b[v], g.push(m.nodeName + "=" + m.nodeValue);
			report.push("rut002-102" + e + this.nodeName + e + "Id missing. Attributes are:" + g.join(",") + ". Every field with data or potential user action should have an id")
		}
		if (r = this.id, "hsdtmpb".indexOf(r.charAt(0)) < 0 && report.push("rut002-103" + e + r + e + "Id should start with s, d, t, h, p or b"), "s" == r.charAt(0) ? (l = "searchField", i = "searchArea") : "d" == r.charAt(0) ? (l = "dtlField", i = "dtlArea") : "t" == r.charAt(0) ? (l = "tblField", i = "tblArea") : "h" == r.charAt(0) && (l = "hdrField", i = "hdrArea"), C = this.classList || null, "pg" == r.substring(3, 5) && "t" == r.charAt(0) || "h" == r.charAt(0) || "m" == r.charAt(0) || "InputElement" == r.slice(-12) || r.indexOf("-selectized") > -1 || "publicToken" == r || "p0-" == r.substring(0, 3) || "by-" == r.substring(0, 3)) return I = !0, !0;
		for ("select" == n && t.options.length <= 0 && report.push("rut002-104" + e + r + e + "<" + n + "> should have at least on option"), "button" != n && "a" != n && (C ? C.contains("searchField") || C.contains("dtlField") || C.contains("hdrField") || C.contains("tblField") || I || report.push("rut002-112" + e + r + e + "<" + n + "> should have class " + l) : report.push("rut002-111" + e + r + e + "<" + n + "> has empty classlist. Should have class " + l)), a = t.parentNode, o = !1; null != a;) {
			if (null != a.classList && a.classList.contains(i)) {
				o = !0;
				break
			}
			a = a.parentNode
		}
		o ? a.id ? r.substring(0, 3) != a.id.substring(0, 3) && report.push("rut002-123" + e + r + e + "<" + n + "> has parent of class " + i + " but this parent has id " + a.id + " of different prefix") : report.push("rut002-122" + e + r + e + "<" + n + "> has parent of class " + i + " but this parent has no id") : I || report.push("rut002-121" + e + r + e + "<" + n + "> should have parent of class " + i), s = t.getAttribute("data-check") || " ", h = 0;
		var x = s.indexOf("len(");
		if (x >= 0) {
			var w = s.substring(x + 4).indexOf(")");
			w >= 0 && (h = s.substring(x + 4, x + 4 + w))
		}
		d = t.getAttribute("data-ct") || " ", c = t.getAttribute("data-type") || " ", p = r.substring(3).toLowerCase(), displayList = [], valueList = [], valueString = "", displayString = "", S = 1 == this.getAttribute("readonly") || this.disabled, O = null != this.maxLength && "undefined" != this.maxLength && this.maxLength < 2e9, d.indexOf("bt-multiSelect") > -1 && (I = !0), "input" == n ? "text" == (u = t.getAttribute("type")) || "text" == c ? (s.indexOf("len(") >= 0 || I || O || S || "date" == c || report.push("rut002-201" + e + r + e + "<" + n + "> of type text should have len(n) defined"), " " != d || I ? d.indexOf("text") < 0 && !I && report.push("rut002-401" + e + r + e + "<" + n + "> of type text should use custom tag rcl:text or more specialised") : report.push("rut002-401" + e + r + e + "<" + n + "> of type text should use custom tag rcl:text or more specialised"), d.indexOf("std") < 0 && (p.indexOf("pot") >= 0 && 5 == h && p.indexOf("terminal") < 0 ? report.push("rut002-411" + e + r + e + "<" + n + "> of type text should use special custom tag stdPort") : p.indexOf("pol") >= 0 && 5 == h && p.indexOf("terminal") < 0 ? report.push("rut002-412" + e + r + e + "<" + n + "> of type text should use special custom tag stdPort") : p.indexOf("pod") >= 0 && 5 == h && p.indexOf("terminal") < 0 ? report.push("rut002-413" + e + r + e + "<" + n + "> of type text should use special custom tag stdPort") : p.indexOf("vessel") >= 0 && 5 == h ? report.push("rut002-414" + e + r + e + "<" + n + "> of type text should use special custom tag stdVessel") : p.indexOf("service") >= 0 && 5 == h ? report.push("rut002-415" + e + r + e + "<" + n + "> of type text should use special custom tag stdService") : p.indexOf("fsc") >= 0 && 3 == h ? report.push("rut002-416" + e + r + e + "<" + n + "> of type text should use special custom tag stdFSC") : 0 <= p.indexOf("email") && 80 == h ? report.push("rut002-421" + e + r + e + "<" + n + "> of type text should be custom tag <rcl:email>") : 0 <= p.indexOf("time") ? report.push("rut002-422" + e + r + e + "<" + n + "> of type text should be custom tag <rcl:time>") : 0 <= p.indexOf("web") ? report.push("rut002-423" + e + r + e + "<" + n + "> of type text should be custom tag <rcl:url>") : 0 <= p.indexOf("date") && "h4-canUpdate" != r ? report.push("rut002-424" + e + r + e + "<" + n + "> of type text should be custom tag <rcl:date>") : 0 <= p.indexOf("fax") && 17 == h ? report.push("rut002-425" + e + r + e + "<" + n + "> of type text should be custom tag <rcl:tel>") : 0 <= p.indexOf("tel") && 17 == h ? report.push("rut002-426" + e + r + e + "<" + n + "> of type text should be custom tag <rcl:tel>") : 0 <= p.indexOf("voyage") && 10 == h ? report.push("rut002-417" + e + r + e + "<" + n + "> of type text special custom tag stdVoyage") : 0 <= p.indexOf("point") && 5 == h ? report.push("rut002-418" + e + r + e + "<" + n + "> of type text special custom tag stdPoint") : 0 <= p.indexOf("del") && 5 == h && p.indexOf("haul_loc") < 0 && report.push("rut002-419" + e + r + e + "<" + n + "> of type text special custom tag stdPoint"))) : "number" == u || "number" == c ? (s.indexOf("dec(") < 0 && report.push("rut002-202" + e + r + e + "<" + n + "> of type number should have dec(n,m) defined"), d.indexOf("number") < 0 && !I && report.push("rut002-427" + e + r + e + "<" + n + "> of type number should use custom tag number or more specialised"), 0 >= s.indexOf("min(0)") && !S && (p.indexOf("width") >= 0 || p.indexOf("height") >= 0 || p.indexOf("weight") >= 0 || p.indexOf("length") >= 0 || p.indexOf("measurement") >= 0 || p.indexOf("pkgs") >= 0 || p.indexOf("breadth") >= 0 || p.indexOf("bundle") >= 0 || p.indexOf("co2") >= 0 || p.indexOf("days") >= 0 || p.indexOf("diameter") >= 0 || p.indexOf("equip_vgm") >= 0 || p.indexOf("humidity") >= 0 || p.indexOf("nitrogen") >= 0 || p.indexOf("oxygen") >= 0 || p.indexOf("percent") >= 0 || p.indexOf("ton") >= 0 || p.indexOf("qty") >= 0 || p.indexOf("age") >= 0 || p.indexOf("axles") >= 0 || p.indexOf("extra_back") >= 0 || p.indexOf("extra_front") >= 0 || p.indexOf("void_slot") >= 0 || p.indexOf("gross") >= 0) && report.push("rut002-203" + e + r + e + "<" + n + "> of type number is likely not negative (min(0)). Please verify")) : "date" != u && "date" != c || d.indexOf("date") < 0 && report.push("rut002-428" + e + r + e + "<" + n + "> of type date should use custom tag date or more specialised") : "select" == n && (displayList = [], 0 > d.indexOf("tb-") && ($("#" + r).find("option").each(function () {
			displayList.push(this.text), valueList.push(this.value)
		}), displayString = ";" + displayList.join(";") + ";", valueString = ";" + valueList.join(";") + ";", 0 <= displayString.indexOf(";BKK;") ? report.push("rut002-301" + e + r + e + "<" + n + "> should use stdSelecTable ShipmentType") : 0 <= displayString.indexOf(";COC;") ? report.push("rut002-311" + e + r + e + "<" + n + "> should use stdSelecTable SocCoc") : 0 <= displayString.indexOf(";Farenheit;") ? report.push("rut002-312" + e + r + e + "<" + n + "> should use stdSelecTable TemperatureMeasure") : 0 <= displayString.indexOf(";Collect;") ? report.push("rut002-313" + e + r + e + "<" + n + "> should use stdSelecTable PrepaidCollect") : 0 <= displayString.indexOf(";local;") ? report.push("rut002-314" + e + r + e + "<" + n + "> should use stdSelecTable PortStatus") : 0 <= displayString.indexOf(";Canvas;") ? report.push("rut002-315" + e + r + e + "<" + n + "> should use stdSelecTable PackageMaterial") : 0 <= displayString.indexOf(";Origin;") ? report.push("rut002-316" + e + r + e + "<" + n + "> should use stdSelecTable OriginDestination") : 0 <= displayString.indexOf(";Truck;") ? report.push("rut002-317" + e + r + e + "<" + n + "> should use stdSelecTable ModeOfTransport") : 0 <= displayString.indexOf(";Revenue Ton;") ? report.push("rut002-318" + e + r + e + "<" + n + "> LclRateBasis") : 0 <= displayString.indexOf(";Laden;") ? report.push("rut002-319" + e + r + e + "<" + n + "> should use stdSelecTable LadenEmpty") : 0 <= displayString.indexOf(";Haul.Loc;") ? report.push("rut002-302" + e + r + e + "<" + n + "> should use stdSelecTable InlandLocationType or InlandLocationTypeWithTruck") : 0 <= displayString.indexOf(";Imperial;") ? report.push("rut002-303" + e + r + e + "<" + n + "> should use stdSelecTable ImperialMetric") : 0 <= displayString.indexOf(";Merchant;") ? report.push("rut002-304" + e + r + e + "<" + n + "> should use stdSelecTable Haulage") : 0 <= displayString.indexOf(";Under Deck;") ? report.push("rut002-305" + e + r + e + "<" + n + "> should use stdSelecTable Handling Instructions") : 0 <= valueString.indexOf(";UD;") ? report.push("rut002-305" + e + r + e + "<" + n + "> should use stdSelecTable Handling Instructions") : 0 <= displayString.indexOf(";Percent;") ? report.push("rut002-306" + e + r + e + "<" + n + "> should use stdSelecTable FreightSurchargeBasis") : 0 <= valueString.indexOf(";%;") ? report.push("rut002-306" + e + r + e + "<" + n + "> should use stdSelecTable FreightSurchargeBasis") : 0 <= displayString.indexOf(";40FT;") ? report.push("rut002-307" + e + r + e + "<" + n + "> should use stdSelecTable EqSize") : 0 <= valueString.indexOf(";40;") ? report.push("rut002-307" + e + r + e + "<" + n + "> should use stdSelecTable EqSize") : 0 <= displayString.indexOf(";Grade A;") ? report.push("rut002-308" + e + r + e + "<" + n + "> should use stdSelecTable EquipmentGrade") : 0 <= displayString.indexOf(";North East;") ? report.push("rut002-309" + e + r + e + "<" + n + "> should use stdSelecTable Direction") : 0 <= valueString.indexOf(";NE;") ? report.push("rut002-309" + e + r + e + "<" + n + "> should use stdSelecTable Direction") : 0 <= displayString.indexOf(";Contract Party;") ? report.push("rut002-321" + e + r + e + "<" + n + "> should use stdSelecTable CustomerFunction") : 0 <= displayString.indexOf(";Consignee;") ? report.push("rut002-322" + e + r + e + "<" + n + "> should use stdSelecTable CustomerType") : 0 <= displayString.indexOf(";Fax;") ? report.push("rut002-323" + e + r + e + "<" + n + "> should use stdSelecTable Communication") : 0 <= valueString.indexOf(";DA;") ? report.push("rut002-324" + e + r + e + "<" + n + "> should use stdSelecTable RateType") : 0 <= valueString.indexOf(";WBHFax;") ? report.push("rut002-325" + e + r + e + "<" + n + "> should use stdSelecTable SpecialCargo") : 0 <= valueString.indexOf(";FN;") && report.push("rut002-326" + e + r + e + "<" + n + "> should use stdSelecTable ContainerLoadingRemarks")))
	});
	var D = !1,
		T = null;
	for (E = 0; E < rut.powerTableIndex.length; E++)
		if (D = !1, null != rut.powerTableIndex[E].settings) {
			for (t = document.getElementById(rut.powerTableIndex[E].settings.rowId); t = t.parentNode, "auto" != (T = getComputedStyle(t).overflowY) && "scroll" != T || (D = !0), !t.classList.contains("tblArea"););
			D || report.push("rut002-431" + e + rut.powerTableIndex[E].containerId + e + "<div> PowerTable has no vertical scrolling")
		}
	rutSaveAsFile(report.join("\r\n"), "Code-Review-Report.csv", "text/plain;charset=utf-8")
}

function rutConvertDate(e, t) {
	return e ? e.length < 10 ? 8 == e.length ? e.substring(6, 8) + "/" + e.substring(4, 6) + "/" + e.substring(0, 4) : null : t ? "/" == e.charAt(2) ? e.substring(6) + "-" + e.substring(3, 5) + "-" + e.substring(0, 2) : "-" == e.charAt(4) ? e : null : "/" == e.charAt(2) ? e : "-" == e.charAt(4) ? e.substring(8) + "/" + e.substring(5, 7) + "/" + e.substring(0, 4) : null : null
}

function rutConvertTime(e, t) {
	if (e.length < 3) return null;
	if (t) {
		if (":" == e.charAt(2)) return e;
		if (e.indexOf(":") < 0) {
			var r = "0000" + e,
				n = r.length;
			return (r = r.substring(n - 4)).substring(0, 2) + ":" + r.substring(2, 4)
		}
		return null
	}
	return ":" == e.charAt(2) ? e.substring(0, 2) + e.substring(3, 5) : e.indexOf(":") < 0 ? e : null
}

function rutOpenDropdownMenue(e, t, r, n) {
	var l = document.getElementById(e);
	null != l && l.parentNode.removeChild(l), itemArray = t.split(" "), functionArray = r.split(" "), html = [], boxWidth = 0, cr = "\r\n", html.push('\t<div id="' + e + '" class="rcl-dropdown-content">');
	for (var i = null, a = 0; a < itemArray.length; a++) i = e.substring(0, 3) + itemArray[a], html.push('\t\t<a id="' + i + '" href="javascript:' + functionArray[a] + ';">' + rutToTitleCase(itemArray[a]) + "</a>"), boxWidth = itemArray[a].length > boxWidth ? itemArray[a].length : boxWidth;
	if (html.push("\t</div> \x3c!-- end dropdown-content --\x3e"), $("body").append(html.join(cr)), l = document.getElementById(e), null != n) {
		var o = n.getBoundingClientRect(),
			s = boxWidth / (rutGetElementValue(n).trim().length + 5),
			u = o.right - s * (o.right - o.left);
		u < 0 && (u = o.left), l.style.left = u + "px", l.style.top = o.bottom + 2 + "px"
	}
	l.classList.add("d-block"), document.addEventListener("click", _rutDrpDwnClkListener), rut.drpDwnConElem = n
}

function _rutDrpDwnClkListener(e) {
	1 === (e.which || e.button) && (e.target == rut.drpDwnConElem && null != rut.drpDwnConElem || (rutCloseDropdownMenue(), document.removeEventListener("click", _rutDrpDwnClkListener), rut.drpDwnConElem = null))
}

function rutCloseDropdownMenue() {
	for (var e = document.getElementsByClassName("rcl-dropdown-content"), t = 0; t < e.length; t++) {
		var r = e[t];
		r.classList.contains("d-block") && (r.classList.remove("d-block"), r.parentNode.removeChild(r))
	}
}

function rutCheckKeydown(e) {
	var t = null;
	switch (e.which) {
		case 112:
			t = "h1-help", fKeyDetected = !0;
			break;
		case 113:
			t = "find", fKeyDetected = !0;
			break;
		case 117:
			t = "h1-save", fKeyDetected = !0;
			break;
		case 119:
			t = "h1-back", fKeyDetected = !0;
			break;
		case 120:
			t = "h1-close", fKeyDetected = !0;
			break;
		default:
			return !0
	}
	if (null != t) return rutClickFKey(t, e)
}

function rutClickFKey(e, t) {
	var r = e;
	if ("find" == r) {
		r = null;
		for (var n = document.getElementsByTagName("button"), l = 0; l < n.length; l++)
			if ("s" == n[l].id.charAt(0) && "find" == n[l].id.substring(3)) {
				r = n[l].id;
				break
			}
	}
	if (r) {
		var i = document.getElementById(r);
		if (i && "none" != i.style.display && 1 != i.disabled && 1 != i.readOnly) return i.click(), null != t ? (t.preventDefault(), !1) : void 0
	}
}

function rutOpenMessageBox(title, message, messageCode, cancelFunction, okFunction, cancelLabel, okLabel, showCloseButton) {
	void 0 === showCloseButton && (showCloseButton = !0);
	var html = [],
		cr = "\r\n";
	if (1 != $("#by-area").dialog("isOpen")) {
		var element = document.getElementById("by-message");
		null != element && element.parentNode.removeChild(element), html.push('<div id="by-area" title="' + title + '" style="display:none;">'), null != messageCode && "" != messageCode ? (html.push('<p id="by-messageCode" class="rcl-messageCode" >' + messageCode + "</p>"), rut.lastError = {
			code: messageCode,
			message: message
		}) : rut.lastError = null, html.push('<p id="by-message" class="rcl-message" >' + message + "</p>"), html.push("</div>\x3c!-- end of message dialog by-area --\x3e");
		var buttons = [];
		okFunction ? buttons.push({
			text: okLabel || "Ok",
			id: "by-pbOk",
			click: function () {
				$(this).dialog("close"), this.parentNode.removeChild(this), "string" == typeof okFunction ? eval(okFunction) : okFunction()
			}
		}) : okLabel && buttons.push({
			text: okLabel,
			id: "by-pbOk",
			click: function () {
				$(this).dialog("close"), this.parentNode.removeChild(this)
			}
		}), cancelFunction ? buttons.push({
			text: cancelLabel || "Cancel",
			id: "by-pbCancel",
			click: function () {
				$(this).dialog("close"), this.parentNode.removeChild(this), "string" == typeof cancelFunction ? eval(cancelFunction) : cancelFunction()
			}
		}) : cancelLabel && buttons.push({
			text: cancelLabel,
			id: "by-pbCancel",
			click: function () {
				$(this).dialog("close"), this.parentNode.removeChild(this)
			}
		}), okFunction || okLabel || cancelFunction || cancelLabel || buttons.push({
			text: okLabel || "Ok",
			id: "by-pbOk",
			click: function () {
				$(this).dialog("close"), this.parentNode.removeChild(this)
			}
		}), $("body").append(html.join(cr)), $("#by-area").dialog({
			autoOpen: !0,
			modal: !0,
			draggable: !1,
			resizable: !1,
			autoResize: !0,
			position: {
				my: "center",
				at: "center",
				of: window
			},
			minWidth: 300,
			minHeight: 50,
			buttons: buttons,
			open: function (e, t) {
				showCloseButton ? $("#dialog-confirm .ui-dialog-titlebar-close").show() : $("#dialog-confirm .ui-dialog-titlebar-close").hide()
			}
		})
	} else html.push('<p class="rcl-messageCode">----</p>'), null != messageCode && "" != messageCode && (html.push('<p class="rcl-messageCode" >' + messageCode + "</p>"), rut.lastError = {
		code: messageCode,
		message: message
	}), html.push('<p class="rcl-messageCode" >' + message + "</p>"), $("#by-message").after(html.join(""))
}

function rutGetLookupData(e, t) {
	var r = "";
	location.hostname.indexOf("dolphin") >= 0 && (r = "");
	var n = location.hostname.indexOf("rclgroup") >= 0 ? "http://" + location.hostname + r + "/HLPWSWebApp/rclws/help/genericHelp" : "http://marlin-ce9.rclgroup.com/HLPWSWebApp/rclws/help/genericHelp",
		l = e.processor;
	l && delete e.processor, $.ajax({
		url: n,
		type: "POST",
		dataType: "json",
		data: JSON.stringify(e),
		complete: function () {
			$("body").find(".loading").remove()
		},
		success: function (e, r, n) {
			var i = e.data;
			if (i) {
				for (var a = 0; a < i.length; a++)
					if (i[a].lkindex = a + 1, l)
						for (var o = 0; o < l.length; o++)
							if (i[a].hasOwnProperty(l[o].column) && l[o].type.indexOf("d") >= 0) {
								var s = l[o].column,
									u = i[a][s] + "";
								i[a][s] = u.substring(0, 4) + "-" + u.substring(4, 6) + "-" + u.substring(6, 8)
							}
				if (l) {
					var d = e.metadata;
					if (d)
						for (a = 0; a < d.length; a++)
							for (o = 0; o < l.length; o++) d[a].columnName == l[o].column && (l[o].type.indexOf("d") >= 0 && (d[a].columnType = 12, d[a].precision = 10), l[o].type.indexOf("h") >= 0 && (d[a].columnName = "HIDE_" + d[a].columnName))
				}
			}
			t(e, r, n)
		},
		error: function (e) {
			rutOpenMessageBox("Lookup Error", e.responseText, "rut004-" + e.readyState, null, "")
		}
	})
}

function rutGetDate(e, t, r) {
	var n = null;
	if ("today" == e)(n = new Date).toISOString();
	else if ("-" == e.charAt(4) && "-" == e.charAt(7)) n = new Date(e);
	else {
		n = new Date;
		var l = 0,
			i = null;
		if (e.indexOf("first") >= 0) i = 0;
		else {
			if (!(e.indexOf("last") >= 0)) return null;
			i = 1, l = -1
		}
		if (e.indexOf("previous") >= 0) i -= 1;
		else if (e.indexOf("next") >= 0) i += 1;
		else if (!(e.indexOf("this") >= 0)) return null;
		n.setMonth(n.getMonth() + i), n.setDate(1 + l)
	}
	return n.setDate(n.getDate() + (t || 0)), r && "ISO" != r ? (r = "num") ? 1e4 * n.getFullYear() + 100 * (1 + n.getMonth()) + n.getDate() : void 0 : n.toISOString().substring(0, 10)
}

function rutToolMenue() {
	var e = document.getElementById("h1-tool");
	rutOpenDropdownMenue("m0-area", "Open_ticket Available_Hot_Keys Self_service_code_review <u>Version:</u>_" + rutGetElementValue("h2-versionheader").replace(/ /g, "_") + " Cancel", "rutSendSupportEmail(true) rutShowHotKeys() rutCheckCodeQuality() rutCloseDropdownMenue() ", e)
}

function rutShowHotKeys() {
	rutOpenDropdownMenue("m0-HotKeys", "F1_Help F2_Find F6_Save F8_Back F9_Close", "rutClickFKey('h1-help') rutClickFKey('find') rutClickFKey('h1-save') rutClickFKey('h1-back') rutClickFKey('h1-close')", document.getElementById("h1-tool"))
}

function rutProcessUrl() {
	if (null != window.location.search && 0 != window.location.search.length) {
		for (var e = decodeURI(window.location.search.substring(1)).split(/&;/), t = [], r = 0; r < e.length; r++)
			if (!((t = e[r].split("=")).length < 2))
				if (void 0 === rut.urlParms && (rut.urlParms = new rutUrlParameter), "{" == t[1].charAt(0) && "}" == t[1].charAt(t[1].length - 1)) {
					let e = null;
					e = "rclp" == t[0] ? t[1].replace(/~sc~/g, ";").replace(/~eq~/g, "=").replace(/~am~/g, "&") : t[1], parmValue = JSON.parse(e), rut.urlParms[t[0]] = parmValue
				} else rut.urlParms[t[0]] = t[1];
		void 0 === rut.urlParms || void 0 === rut.urlParms.rclp ? "function" == typeof autorun && autorun() : rut.urlParms.processTo()
	}
}

function rutBack() {
	var e = !1;
	if (("function" != typeof prepareBack || 0 != (e = prepareBack())) && void 0 !== rut.urlParms && void 0 !== rut.urlParms.rclp)
		if ("2tab" == rut.urlParms.rclp.flowType.toLowerCase()) {
			if (null != window.opener) {
				var t = window.opener.document.getElementById("d99-modalArea");
				null != t && t.parentNode.removeChild(t)
			}
			"no back action" != e && (rut.urlParms.processBack(), "function" == typeof postProcessBack && postProcessBack()), window.open("", "_parent", ""), window.close(), window.opener.focus()
		} else if ("1tab" == rut.urlParms.rclp.flowType.toLowerCase()) {
		new rutDialogFlow("back", rut.urlParms.rclp.sourceUrl, !1).openPage()
	}
}

function rutUrlParameter() {
	function rutRestorePage(e) {
		let t = document.body.id;
		rut.browser.isChrome || rut.browser.isFirefox ? $("#" + t).replaceWith(e.rut.sourceModel.dom) : document.body.innerHTML = e.rut.sourceModel.html;
		for (let t in e.rut.sourceModel.appGlobVars) window[t] = e.rut.sourceModel.appGlobVars[t];
		if (!rut.browser.isChrome && !rut.browser.isFirefox) {
			if (void 0 !== rut.powerDetails && void 0 !== rut.powerDetails.length)
				for (var r = 0; r < rut.powerDetails.length; r++) rptDisplayDetailArea(rut.powerDetails[r].id, rut.powerDetails[r].object);
			if (void 0 !== rut.powerTableIndex && void 0 !== rut.powerTableIndex.length)
				for (var n = 0; n < rut.powerTableIndex.length; n++) rptClearDisplay(rut.powerTableIndex[n].containerId), rptDisplayTable(rut.powerTableIndex[n].containerId)
		}
		if (rutInitArea("body"), void 0 !== rut.powerTableIndex && void 0 !== rut.powerTableIndex.length) {
			let e = null;
			for (n = 0; n < rut.powerTableIndex.length; n++) "t99Lookup" != (e = rut.powerTableIndex[n].containerId) && document.getElementById(e).addEventListener("contextmenu", function (t) {
				rptShowSortControl(e), t.preventDefault()
			}, !1)
		}
	}
	this.processTo = function () {
		if (this.processFlowType(), "back" == this.rclp.flowType.toLowerCase()) {
			let e = rut.urlParms.rclp.prepareBackResult;
			if (null == window.opener) return;
			return rutRestorePage(window.opener), "no back action" != e && (window.opener.rut.urlParms.processBack(), "function" == typeof window.opener.postProcessBack && window.opener.postProcessBack()), void window.opener.close()
		}
		if (this.rclp.windowOpener = window.opener, "goto" != this.rclp.flowType.toLowerCase() ? this.rclp.sourceUrl = window.opener.location.href.split("?")[0] : this.rclp.sourceUrl = null, "1tab" == this.rclp.flowType.toLowerCase() && this.saveSourcePage(), this.processAllInstructions(this.rclp.to), "1tab" == this.rclp.flowType.toLowerCase()) {
			window.opener.open(null, "_self");
			try {
				window.opener.close()
			} catch (e) {
				console.log("too fast")
			}
		}
	}, this.processBack = function () {
		this.processAllInstructions(this.rclp.back)
	}, this.processAllInstructions = function (e) {
		if (void 0 !== e)
			for (var t = 0; t < e.length; t++) this.processFlowInstruction(e[t])
	}, this.processFlowInstruction = function (flowInstruction) {
		var windowOpener = this.rclp.windowOpener;
		if ("field" == flowInstruction.class) eval(this.convertInstrToStatement(flowInstruction));
		else if ("action" == flowInstruction.class) {
			var expression = flowInstruction.expr,
				type = flowInstruction.type.substring(4, 7),
				win = "src" == flowInstruction.type.substring(0, 3) ? window.opener : window;
			"clk" == type ? win.document.getElementById(expression).click() : "jsx" == type && win.eval(expression)
		} else if ("table" == flowInstruction.class) {
			var id = null,
				sort = [];
			id = flowInstruction.id, sort = flowInstruction.sort;
			var win = "src" == flowInstruction.type.substring(0, 4) ? windowOpener : window;
			if (null != flowInstruction.search && (win.rptSetSearchString(id, flowInstruction.search), win.rptSearch(id)), null != sort) {
				for (var i = 0; i < sort.length; i++) win.rptAddSingleSortDefinition(id, sort[i].columnName, sort[i].ascDesc);
				win.rptSortPowerTable(id, !1)
			}
			null != flowInstruction.page && win.rptGotoPage(id, flowInstruction.page)
		} else if ("setting" == flowInstruction.class) {
			var win = "src" == flowInstruction.type ? windowOpener : window,
				id = flowInstruction.tabGroupId,
				tabName = flowInstruction.activeTabName,
				tag = null,
				found = !1,
				activeNavLink = null,
				activeTabPane = null,
				newActiveTabId = id.substring(0, 3) + tabName.replace(/[^a-zA-Z0-9]/g, "");
			win.$("#" + id).find(".tab-pane,.nav-link").each(function () {
				"a" == (tag = this.nodeName.toLowerCase()) ? (this.classList.contains("active") && (activeNavLink = this), tabName == rutGetElementValue(this) ? (found = !0, this.classList.add("active")) : this.classList.remove("active")) : "div" == tag && (this.classList.contains("active") && (activeTabPane = this), this.id == newActiveTabId ? (found = !0, this.classList.add("active")) : this.classList.remove("active"))
			}), found || (activeNavLink.classList.add("active"), activeTabPane.classList.add("active"))
		}
	}, this.convertInstrToStatement = function (e) {
		setWindow = "src" == e.type.substring(0, 3) ? "windowOpener" : "window", setObject = e.type.substring(4, 7), valueWindow = "src" == e.type.substring(8, 11) ? "windowOpener" : "window", valueObject = e.type.substring(12, 15);
		var t = null;
		let r = "&" == e.id.charAt(0) ? e.id.substring(1) : '"' + e.id + '"',
			n = null;
		null != e.lRow && (n = "&" == e.lRow.charAt(0) ? e.lRow.substring(1) : '"' + e.lRow + '"');
		let l = null;
		null != e.rRow && (l = "&" == e.rRow.charAt(0) ? e.rRow.substring(1) : '"' + e.rRow + '"');
		let i = "&" == e.value.charAt(0) ? e.value.substring(1) : '"' + e.value + '"';
		if ("con" == valueObject) {
			let r = e.value,
				n = r.length - 1;
			t = '"' == r.charAt(0) && '"' == r.charAt(n) ? r : isNaN(r) ? "false;true;null".indexOf(r) >= 0 ? r : "{" == r.charAt(0) && "}" == r.charAt(n) ? "JSON.parse(" + r + ")" : '"' + r + '"' : r
		}
		let a = {
				pse: setWindow + ".rutSetElementValue(" + r,
				psa: setWindow + ".rptSetSingleAreaValues(" + r,
				pre: setWindow + ".rptSetRowElementValue(" + n + "," + r,
				pra: "end" != n ? setWindow + ".rptReplOneRowOfData(null," + r : setWindow + ".rptReplLastRowOfData(" + r,
				var: setWindow + "." + e.id
			},
			o = {
				pse: valueWindow + ".rutGetElementValue(" + i + ")",
				psa: valueWindow + ".rptGetDataFromSingleArea(" + i + ")",
				pre: valueWindow + ".rptGetRowElementValue(" + l + "," + i + ")",
				pra: valueWindow + ".rptGetModelDataOfRowId(null," + i + ")",
				var: valueWindow + "." + e.value,
				con: t
			};
		return "var" == setObject ? separator = "=" : separator = ",", "var;con".indexOf(setObject) >= 0 ? closingPiece = "" : "pra" == setObject ? closingPiece = ",true)" : closingPiece = ")", a[setObject] + separator + o[valueObject] + closingPiece
	}, this.processFlowType = function () {
		if ("2tab" == this.rclp.flowType.toLowerCase()) {
			let e, t = '<div id="d99-modalArea" class="rcl-modal"></div>';
			null != window.opener && window.opener !== window && (e = window.opener.document.getElementsByTagName("body")[0]).insertAdjacentHTML("afterbegin", t), window.addEventListener("beforeunload", function (e) {
				var t = window.opener.document.getElementById("d99-modalArea");
				null != t && t.parentNode.removeChild(t)
			})
		}
		if ("1tab;2tab;ntab".indexOf(this.rclp.flowType.toLowerCase()) >= 0) {
			let e = !0;
			void 0 !== this.rclp.setBackButton && (e = this.rclp.setBackButton), e && (document.getElementById("h1-back").style.display = "inline")
		}
	}, this.saveSourcePage = function () {
		let e = window.opener.document.body.id;
		rut.browser.isChrome || rut.browser.isFirefox ? (rut.sourceModel = {
			dom: "",
			appGlobVars: {}
		}, rut.sourceModel.dom = window.opener.$("#" + e).clone(!0, !0)) : (rut.sourceModel = {
			html: "",
			appGlobVars: {},
			scrollTops: [],
			headerData: []
		}, rut.sourceModel.html = window.opener.document.body.innerHTML, rut.sourceModel.headerData.push({
			id: "h0-title",
			value: rutGetElementValue("h0-title")
		}), rut.sourceModel.headerData.push({
			id: "h0-userData",
			value: rutGetElementValue("h0-userData")
		}), rut.sourceModel.headerData.push({
			id: "h2-versionheader",
			value: rutGetElementValue("h2-versionheader")
		}), rut.sourceModel.headerData.push({
			id: "h3-userToken",
			value: document.getElementById("h3-userToken").defaultValue
		}), rut.sourceModel.headerData.push({
			id: "h3-userId",
			value: document.getElementById("h3-line").defaultValue
		}), rut.sourceModel.headerData.push({
			id: "h3-trade",
			value: document.getElementById("h3-trade").defaultValue
		}), rut.sourceModel.headerData.push({
			id: "h3-agent",
			value: document.getElementById("h3-agent").defaultValue
		}), rut.sourceModel.headerData.push({
			id: "h3-fscCode",
			value: document.getElementById("h3-fscCode").defaultValue
		}), window.opener.$(".searchArea, .dtlArea").each(function () {
			window.opener.rptGetDataFromSingleArea(this.id)
		}));
		let t = window.opener.rutGetGlobalVariables();
		for (let e = 0; e < t.length; e++) rut.sourceModel.appGlobVars[t[e]] = window.opener[t[e]]
	}
}

function rutGetGlobalVariables() {
	return Object.keys(window).filter(function (e) {
		Object.entries || (Object.entries = function (e) {
			for (var t = Object.keys(e), r = t.length, n = new Array(r); r--;) n[r] = [t[r], e[t[r]]];
			return n
		});
		return "function" != typeof window[e] && ("__BROWSERTOOLS_" != e.substring(0, 15) && ("$" != e.charAt(0) && ("console" != e && (!("bootstrap,parent,opener,length,frames,location,self,chrome,ietab,".indexOf(e + ",") >= 0) && (!("fromWindow,domJSON,tableSettings,data,parmValue,setWindow,setObject,element,trgWindow,".indexOf(e + ",") >= 0) && (!("valueWindow,valueObject,separator,closingPiece,tag,hasParentArea,hasParentRow,".indexOf(e + ",") >= 0) && 2 === Object.entries(Object.getOwnPropertyDescriptor(window, e)).filter(function (e) {
			return !!("writable,enumerable,".indexOf(e[0]) >= 0 && e[1])
		}).length))))))
	})
}

function rutDialogFlow(e, t, r) {
	this.flowType = e, this.url = t, this.setBackButton = r, this.to = [], this.back = [], this.settings = null, this.addToField = function (e, t, r, n, l, i, a, o) {
		this.to.push(this.convertField(e, t, r, n, l, i, a, o))
	}, this.addBackField = function (e, t, r, n, l, i, a, o) {
		this.back.push(this.convertField(e, t, r, n, l, i, a, o))
	}, this.convertField = function (e, t, r, n, l, i, a, o) {
		if (";src;trg;".indexOf(";" + e + ";") < 0) return void alert("addTo/BackField: Parameter lPage must be src|trg");
		if (";src;trg;".indexOf(";" + l + ";") < 0) return void alert("addTo/BackField: Parameter rPage must be src|trg");
		if (";element;variable;area;rowElement;rowArea;".indexOf(";" + t + ";") < 0) return void alert("addBackField: Parameter lObjType must be element|variable|area|rowElement|rowArea");
		if (";element;variable;area;rowElement;rowArea;constant;".indexOf(";" + i + ";") < 0) return void alert("addBackField: Parameter rObjType must be element|variable|area|rowElement|rowArea|constant");
		const s = {
			element: "pse",
			variable: "var",
			area: "psa",
			rowElement: "pre",
			rowArea: "pra",
			constant: "con"
		};
		let u = {
			class: "field",
			type: e + "-" + s[t] + "-" + l + "-" + s[i],
			id: n,
			value: o
		};
		return null != r && (u.lRow = r), null != a && (u.rRow = a), u
	}, this.convertAction = function (e, t, r) {
		if (";src;trg;".indexOf(";" + e + ";") < 0) return void alert("addAction: Parameter page must be src|trg");
		if (";click;expression;".indexOf(";" + t + ";") < 0) return void alert("addAction: Parameter actionType must be click|expression");
		return {
			class: "action",
			type: e + "-" + {
				click: "clk",
				expression: "jsx"
			}[t],
			expr: r
		}
	}, this.addToAction = function (e, t, r) {
		this.to.push(this.convertAction(e, t, r))
	}, this.addBackAction = function (e, t, r) {
		this.back.push(this.convertAction(e, t, r))
	}, this.addToTable = function (e, t, r, n, l) {
		this.to.push({
			class: "table",
			type: e,
			id: t,
			search: r,
			sort: n,
			page: l
		})
	}, this.addBackTable = function (e, t, r, n, l) {
		this.back.push({
			class: "table",
			type: e,
			id: t,
			search: r,
			sort: n,
			page: l
		})
	}, this.addToSettings = function (e) {
		this.to.push({
			class: "setting",
			type: "trg",
			tabGroupId: e.tabGroupId,
			activeTabName: e.activeTabName
		})
	}, this.addBackSettings = function (e) {
		this.back.push({
			class: "setting",
			type: "src",
			tabGroupId: e.tabGroupId,
			activeTabName: e.activeTabName
		})
	}, this.openPage = function () {
		var e = {
			flowType: this.flowType
		};
		if (!("goto,2tab,ntab".indexOf(this.flowType.toLowerCase()) < 0)) {
			null != this.setBackButton && (e.setBackButton = this.setBackButton);
			var r = null;
			this.to.length > 0 && (e.to = this.to), this.back.length > 0 && (e.back = this.back), this.settings && (e.settings = this.settings), "nTab" == this.flowType && (r = "_blank");
			var n = encodeURI(JSON.stringify(e)).replace(/;/g, "~sc~").replace(/=/g, "~eq~").replace(/&/g, "~am~"),
				l = this.prepareUrl(t, n);
			return trgWindow = null == r ? window.open(l) : window.open(l, r), trgWindow
		}
		alert("Flow type " + this.flowType + " not supported")
	};
	var n = ["service", "select", "target", "pageAction", "moduleCd", "linkPage", "passThrough", "userId"];

	function l(e) {
		for (var t = 0; t < n.length; t++)
			if (e === n[t]) return !0;
		return !1
	}
	this.packForRclServlet = !0, void 0 !== rut.packForRclServlet && (this.packForRclServlet = rut.packForRclServlet), this.prepareUrl = function (e, t) {
		if (e = e.indexOf("?") < 0 ? e + "?rclp=" + t : e + "&rclp=" + t, console.log("2 dlg prepareUrl:", this.packForRclServlet, rut.rclServletPackedParamKey, rut.rclServletParamDelimiter, rut.rclServletEqDelimiter), this.packForRclServlet) {
			console.log("3 dlg packForRclServlet:", this.packForRclServlet, rut.rclServletPackedParamKey, rut.rclServletParamDelimiter, rut.rclServletEqDelimiter);
			var r = e.indexOf("?"),
				n = e.substring(0, r),
				i = e.substr(r + 1).split("&");
			e = n + "?";
			for (var a = !1, o = "", s = 0; s < i.length; s++) {
				var u = i[s].indexOf("=");
				if (!(u < 0)) {
					var d = i[s].substring(0, u);
					if (l(d)) a && (e += "&"), e += i[s], a = !0;
					else {
						var c = i[s].substring(u + 1);
						o.length > 0 && (o += rut.rclServletParamDelimiter), o += d + rut.rclServletEqDelimiter + c
					}
				}
			}
			a && (e += "&"), e += rut.rclServletPackedParamKey + "=" + o
		}
		return e
	}
}

function rutHandleCollapseEvent(e) {
	var t = e.target,
		r = null,
		n = null,
		l = 0;
	if ("hide" == e.type) {
		if (t.setAttribute("data-originalHeight", t.clientHeight), null == (r = i(t))) return void e.stopPropagation();
		n = r.getBoundingClientRect(), l = Math.round(n.bottom - n.top + t.clientHeight), r.style.height = l + "px"
	}
	if ("show" == e.type) {
		let a = t.getAttribute("data-originalHeight");
		if (isNaN(a) && (a = 0), null == (r = i(t))) return void e.stopPropagation();
		n = r.getBoundingClientRect(), l = Math.round(n.bottom - n.top - a), r.style.height = l + "px"
	}

	function i(e) {
		for (var t = e.getBoundingClientRect().bottom, r = 1e5, n = document.getElementsByClassName("tblArea"), l = null, i = null, a = 0; a < n.length; a++)(l = n[a].getBoundingClientRect()).top < t || l.top < r && (r = l.top, i = n[a]);
		return i
	}
}

function rutSplitRowID(e) {
	var t = e.split(e.substring(0, 3));
	return t.length > 2 ? e.substring(0, 3) + t[1] + "-" + t[2].split("-")[1] : e
}

function _findElementLabel(e) {
	var t = $("#" + e).prev().html();
	return t || (t = $("#" + e).prop("name")), t || (t = $("#" + e).parent().parent().parent()[0].firstElementChild.innerText), t || (t = e.substring(3)), rutToTitleCase(t)
}
$(document).ready(function () {
	rutInitPage()
}), $(window).on("load", function () {
	$(document).ready(function () {
		rutProcessUrl()
	})
});
var svaProcessorMin = /^min\[\d+\]/;

function _rutParseLookupSelectProcessor(e) {
	e = e.split(",");
	for (var t = {}, r = 0; r < e.length; r++) {
		var n = e[r];
		if (svaProcessorMin.test(n)) {
			var l = parseInt(n.substring(4, n.indexOf("]")));
			t.min = l
		} else n.indexOf("main") >= 0 && (t.main = !0)
	}
	return t
}

function rutSpinnerIncrement(e, t, r) {
	let n = e;
	if (null != r) {
		let e = r.lastIndexOf("-");
		n += r.substring(e)
	}
	let l = document.getElementById(n);
	var i = l.min,
		a = l.max,
		o = l.getAttribute("data-check"),
		s = 20,
		u = 0;
	if (null != o) {
		var d = o.indexOf("dec(");
		d >= 0 && (o = (o = (o = o.substring(d + 4)).split(")")[0]).split(","), s = Number(o[0]), u = Number(o[1]), NaN == s && (s = 20))
	}
	let c = Number(l.getAttribute("step"));
	c = null != c && "" != c ? t * Number(c) : t;
	let p = Number(rutGetElementValue(n)),
		h = Number(p + c).toFixed(u);
	null != a && "" != a && h > Number(a) && (h = Number(a)), null != i && "" != i && h < Number(i) && (h = Number(i));
	let f = h.toString();
	if ((f = (f = f.replace(".", "")).replace("-", "")).length > s && (h = p), rutSetElementValue(n, h), "InputElement" == e.slice(-12) && rutSliderSetValueFrom(e.slice(0, -12), e), null != rptGetParentIds(e).parentContainerId)
		if ("createEvent" in document) {
			var m = document.createEvent("HTMLEvents");
			m.initEvent("change", !0, !0), l.dispatchEvent(m)
		} else l.fireEvent("onchange")
}

function rutSliderInitialize(e, t, r, n, l, i, a, o, s) {
	var u = null != i ? Math.pow(10, i) : 1,
		d = 1 / parseFloat(u),
		c = null == o || o,
		p = a,
		h = null == n || "null" == n,
		f = h ? t * u : n * u;
	if (document.getElementById(e).classList.contains("tblField")) {
		let t = null;
		if ($("*[for='" + e + "']").each(function () {
				(t = this).classList.contains("rcl-sliderMin") ? t.id = e + "Min" : t.classList.contains("rcl-sliderMax") ? t.id = e + "Max" : t.classList.contains("rcl-sliderLabel") ? t.id = e + "Label" : t.classList.contains("rcl-sliderInput") ? t.id = e + "InputElement" : t.classList.contains("rcl-sliderDisplay") && (t.id = e + "Display")
			}), null != a && e.substring(0, 3) == a.substring(0, 3)) {
			let t = e.lastIndexOf("-");
			t > 3 && (p = a + e.substring(t))
		}
	}
	document.getElementById(e).setAttribute("data-novalue", h), $("#" + e).slider({
		range: "min",
		min: t * u,
		max: r * u,
		value: f,
		step: 1,
		rclStep: l,
		rclDecimals: i,
		rclFactor: d,
		rclMultiplier: u,
		rclSyncToId: p,
		rclWithValueDisplay: c,
		rclWithIntegratedField: s,
		create: function (e, t) {},
		slide: function (t, r) {
			if (null != rptGetParentIds(t.target).parentContainerId) {
				var n = document.getElementById(e);
				if ("createEvent" in document) {
					var l = document.createEvent("HTMLEvents");
					l.initEvent("change", !0, !0), n.dispatchEvent(l)
				} else n.fireEvent("onchange")
			}
			c && rutSetElementValue(e + "Display", (r.value * d).toFixed(i)), null != p && rutSetElementValue(p, r.value * d), s && rutSetElementValue(e + "InputElement", r.value * d)
		}
	}), document.getElementById(e + "Min").textContent = t, document.getElementById(e + "Max").textContent = r, c && (h || rutSetElementValue(e + "Display", Number(n).toFixed(i))), n = h ? "" : n, p && rutSetElementValue(p, n), null != s && s && rutSetElementValue(e + "InputElement", n)
}

function rutSliderSetValue(e, t) {
	var r = "#" + e,
		n = t,
		l = !1;
	if (null != t && "null" != t && "" != t) document.getElementById(e).setAttribute("data-novalue", !1);
	else {
		document.getElementById(e).setAttribute("data-novalue", !0);
		l = !0
	}
	var i = $(r).slider("option", "rclFactor"),
		a = i * $(r).slider("option", "min"),
		o = i * $(r).slider("option", "max"),
		s = a <= (n = l ? a : n) ? n : a;
	s = o >= s ? s : o;
	let u = "",
		d = e;
	if (document.getElementById(e).classList.contains("tblField")) {
		let t = e.lastIndexOf("-");
		t < 3 ? (u = "", d = e) : (u = e.substring(t), d = e.substring(0, t))
	}
	let c = Math.round(s * $(r).slider("option", "rclMultiplier"));
	$(r).slider("value", c);
	let p = $(r).slider("value") * i;
	$(r).slider("option", "rclWithValueDisplay") && rutSetElementValue(e + "Display", l ? "" : parseFloat(p).toFixed($(r).slider("option", "rclDecimals"))), p = l ? "" : p;
	var h = $(r).slider("option", "rclSyncToId");
	null != h && rutSetElementValue(h, p), (h = $(r).slider("option", "rclWithIntegratedField")) && rutSetElementValue(e + "InputElement", p)
}

function rutSliderGetValue(e) {
	if ("true" == document.getElementById(e).getAttribute("data-novalue")) return null;
	var t = "#" + e;
	return 0 != parseInt($(t).slider("option", "rclDecimals")) ? parseFloat($(t).slider("value") * $(t).slider("option", "rclFactor")) : parseInt($(t).slider("value") * $(t).slider("option", "rclFactor"))
}

function rutSliderSetValueFrom(e, t, r) {
	if (null == r) rutSliderSetValue(e, rutGetElementValue(t));
	else if (0 == t.indexOf(e) && t.substring(0, 3) == r.substring(0, 3)) {
		let n = r.lastIndexOf("-"),
			l = e + r.substring(n);
		rutSliderSetValue(l, rutGetElementValue(l + t.substring(e.length)))
	} else rutSliderSetValue(e, rutGetElementValue(t))
}

function rutSliderIncrement(e, t, r) {
	let n = e;
	if (null != r) {
		let e = r.lastIndexOf("-");
		n += r.substring(e)
	}
	var l = "#" + n,
		i = $(l).slider("option", "rclStep"),
		a = $("#" + n).slider("value");
	rutSliderSetValue(n, $(l).slider("option", "rclFactor") * a + t * i), $(l).slider("option", "rclWithValueDisplay") && rutSetElementValue(n + "Display", ($(l).slider("value") * $(l).slider("option", "rclFactor")).toFixed($(l).slider("option", "rclDecimals")))
}

function rutInitAreaWithSliders(e) {
	var t = null,
		r = 0,
		n = 0,
		l = 0,
		i = 1,
		a = null,
		o = null,
		s = null,
		u = !1,
		c = !1;
	$("body" == e ? "body" : "#" + e).find("div").each(function () {
		(t = this.getAttribute("data-ct")) && t.indexOf("bt-slider") >= 0 && (a = this.getAttribute("data-slider"), d = a.split("/"), r = "" == d[0] ? 0 : d[0], n = "" == d[1] ? 0 : d[1], s = "" == d[2] ? r : d[2], i = "" == d[3] ? 0 : d[3], "" == d[4] ? 0 : d[4], l = "" == d[5] ? 0 : d[5], o = "" == d[6] ? null : d[6], u = "true" == d[7], c = "true" == d[8], rutSliderInitialize(this.id, r, n, s, i, l, o, u, c))
	})
}

function rutSetMultiSelectValue(e, t) {
	var r = $("#" + e)[0].selectize;
	if (null != r) {
		if (r.clear(), r.setValue(t.split(",")), r.refreshItems(), null != rptGetParentIds(e).parentContainerId) {
			var n = document.getElementById(e);
			if ("createEvent" in document) {
				var l = document.createEvent("HTMLEvents");
				l.initEvent("change", !0, !0), n.dispatchEvent(l)
			} else n.fireEvent("onchange")
		}
	} else document.getElementById(e).value = t
}

function rutMultiSelectRenderItem(e, t, r, n) {
	return '<div style="background-color: #2a6aa2"><div ' + (n ? ' onclick="event.stopPropagation();' + n + "('" + e + "','" + t.value + "',event,this)\" " : "") + " data-val=" + r(t.value) + '" data-id="' + r(t.option) + '" data-toggle="tooltip" title="' + r(t.option) + '" ">' + r(t.option) + "</div></div>"
}

function rutMultiSelectRenderListItem(e, t) {
	return '<div class="option"><span>' + t(e.option) + "</span></div>"
}

function rutInitMultiSelect(e) {
	var t = e,
		r = e.lastIndexOf("-");
	r > 2 && (t = e.substring(0, r));
	var n = t.replace(/[^\w\d]/, "");
	$("#" + e).selectize({
		create: !1,
		createOnBlur: !1,
		maxItems: null,
		valueField: "value",
		searchField: "option",
		copyClassesToDropdown: !1,
		plugins: ["remove_button"],
		items: rutGetElementValue(e).split(","),
		options: rut.multiSelectTables[n],
		onInitialize: function () {
			this.$wrapper.removeClass("tblField"), this.$wrapper.removeClass("dtlField"), this.$wrapper.removeClass("searchField")
		},
		render: {
			option: function (e, t) {
				return rutMultiSelectRenderListItem(e, t)
			},
			item: function (t, r) {
				let n = document.getElementById(e).getAttribute("data-itemClick");
				return rutMultiSelectRenderItem(e, t, r, n = "" != n ? n : null)
			}
		}
	})
}

function rutInitAreaWithMultiSelect(e) {
	var t = null;
	$("body" == e ? "body" : "#" + e).find("input").each(function () {
		(t = this.getAttribute("data-ct")) && t.indexOf("bt-multiSelect") >= 0 && (!this.classList.contains("tblField") || this.id.lastIndexOf("-") > 3) && rutInitMultiSelect(this.id)
	})
}