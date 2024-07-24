export default class MenuConfig {
    constructor(id, name, icon, routeTo = "/default", children = null) {
        this._id = id;
        this._name = name;
        this._icon = icon;
        this._toggled = false;
        this._routeTo = routeTo;
        this._children = children;
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get icon() {
        return this._icon;
    }
    set icon(icon) {
        this._icon = icon;
    }

    get toggled() {
        return this._toggled;
    }
    set toggled(toggled) {
        this._toggled = toggled;
    }

    get routeTo() {
        return this._routeTo;
    }
    set routeTo(routeTo) {
        this._routeTo = routeTo;
    }

    get children() {
        return this._children;
    }
}