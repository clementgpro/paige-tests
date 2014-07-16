# nbd/Controller
  *extends* [nbd/Class](Class.md)

* [.\_initView()](#initview-viewclass-)
* [.swapView()](#swapview-viewclass-)

`Controller` is a class that provides the conceptual binding of all three parts
of MVC: Model, View, and Controller. An instance of the controller is meant to
be the representation of the entity, including all public-facing methods of the
entity.

In **nbd.js**, `Controller` class is a very basic class that only provides some
View management functionality. In most scenarios, `nbd/Controller/Entity` is
the more useful controller class.

# `._initView( ViewClass, ... )`

This method is the default implementation for creating an instance of
`ViewClass` such that the instance is attached to the controller instance as
`this._view` (and `this.View` for legacy compatibility). In addition, the
controller instance is attached onto the view instance as `._controller`
(and `.Controller` for legacy).

All subsequent arguments after `ViewClass` are passed to the `ViewClass`
constructor as arguments.

**returns** *nothing*

# `.switchView()`

The public-facing method that calls `._initView()` and swaps out the existing
view instance, if one exists.

All arguments to `.switchView()` are passed to `._initView()` for constructing
the new view instance. The previous view instance, if it exists, is
`.destroy()`ed. In addition, the old view's `.$view` will be the new view's
`.$view`. Finally, `.render()` is called on the new view such that the new view
is re-rendered in place of the old view.

**returns** *nothing*
