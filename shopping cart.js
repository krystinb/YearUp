var run = true;
var dynamicCart = [];  

// 1. This determines whether or not we should manipulate the cart (enter Brain()).
var Introduction = function ()
{
  var emptyCart = true; // Used by Closing() to determine if we ever added anything to the cart.
  var uInput = prompt("Hello! Welcome to the shopping cart. Would you like to add an item to the cart? y/n").toUpperCase();
  
  switch (uInput)
  {
    case "Y":
      alert("Alright, let's get started!");
      Brain(); // Manipulate the cart (enter Brain())
      emptyCart = false;
      break;
    case "N":
      run = false;
      break;
    default:
      alert("Invalid input chosen. Try again.");
      Introduction();
      break;
  }
  return emptyCart;
}
// 2. The start of the cart manipulation. 
function Brain ()
{
  // makeItem() returns an item object based on user input.  
  // If the user didn't enter -1 when told to enter an item name, we push the object into the cart.
  var item = makeItem();
  if (item == null){ return; } else { pushItem(dynamicCart, item); alert("Added a(n)" + item.name + " to the cart!");} //
  
  // dAddMore() by itself handles how to proceed if the user decides not to add more items, and if the user decides to add more items, it calls makeItem(), which determines if the user entered -1 as an item name and returns a bool based on that. We link the bools. 
  // We determine what to do with the linked bool.
  var dAddMore = dAddMoreItems();
  if (dAddMore == false) { run = false; return; } else { //alert("moving on to removals (addmore)"); 
  }
  
  // dRemoveItem() by itself handles how to proceed if the user decides not to remove items, and if the user decides to remove items, it calls removeItem(), which determines if the user entered -1 when asked to enter the name of the item to remove or when to enter the quantity to remove. We link the bools. 
  // We determine what to do with the linked bool.
  var dRemoveItem = dRemoveItems();  
  if (dRemoveItem == false) { run = false; return; } else { /*("moving on to sums (removeItem)");*/ }
  
  // If we reach this, it means the the user entered no in response to removing an item by name, which is the last portion of the program.
  run = false;
  
  // Tail End Recursion Caller (while loop alternative)
  if (run == true)
  {
    Brain();
  }
}
// 3. The end of the program. It takes into consideration whether or not we manipulated the cart.
// Let it be known that i absolutely hate if-statements.
function Closing ()
{
  if (introduction == false && dynamicCart.length >= 1)
  {
    var sum = 0;
    for (var i = 0; i < dynamicCart.length; i++)
    {
      if (dynamicCart[i].name !== null){ sum += uniquePriceCountTotal(dynamicCart[i]);}
      else { alert("Invalid item name!"); return; }
    }
    if (sum > 100)
    {
      alert("The sum of all items with tax is: " + "$" + sum + ". Items over $100 may be addressed with a line of credit.");
    }
    else 
    {
      alert("The sum of all items with tax is: " + "$" + sum + ". Items below $100 should be purchased with cash.");
    }
  }
  else 
  {
    alert("No items in cart.");
  }
}
// Calling our functions. Remember, Brain() is called by Introduction() if the condition is met.
var introduction = Introduction();
Closing();
alert("Goodbye!");
// *************************************FUNCTIONALITY CODE*************************************

/* Creates an object based on user input and returns it */
function makeItem () 
{
  var uItem = prompt("To place an item in your cart, use the syntax: (item name, item price) without the parentheses or dollar sign in front of the price. Enter -1 to exit the program.");
  var uItemSeperated = uItem.split(", ");
  
  if (uItem == -1) { return null; } else { /* console.log("filler"); */ }  
  var item = {};  
  item["name"] = uItemSeperated[0];
  item["price"] =  uItemSeperated[1]//parseFloat(uItem[1] * .075) + parseFloat(uItem[1]);
  item["count"] = 1;                    
  return item;
}

/* The process of pushing an item into the cart */
function pushItem (itemArray, item)
{
  for (var i = itemArray.length - 1; i >= 0; i--)
  {
    if (itemArray[i].name === item.name) 
    {
      itemArray[i].count++;
      return;           
    }
  }
  itemArray.push(item);
}

/* Handles the call upon makeItem(). Until the user inputs No or -1, continuously calls makeItem(). */
function dAddMoreItems ()
{
  var toContinueProgram = true;  
  var whileCondition = true;  
  
  // Iteration of nested function depends on its returned value.
  function dAddMo ()
  {
    var feedWhile = true;
    var qAddMore = prompt("Would you like to add MORE elements to the cart? Enter 'y' (yes) or 'n' (no). Enter -1 to exit the program.").toUpperCase();
 
    // Used if-statements because you get an uncaught error for uppercasing a number:
    if (qAddMore === "Y" || qAddMore === "y")
    {
      var item = makeItem();
      if (item == null){ feedWhile = false; } else { pushItem(dynamicCart, item); alert("Added a(n) " + item.name + " to the cart!"); }
    }
    else if (qAddMore === "N" || qAddMore === "n") { feedWhile = false; return; }
    else if (qAddMore == -1) { toContinueProgram = false; feedWhile = false; }
    else { alert("Invalid input! Try again."); }
    return feedWhile;
  }
  while (whileCondition)  
  {
    // The loop
    whileCondition = dAddMo();   
  }
  return toContinueProgram;
}

/* Handles the user input related to removing items. A LOT OF DEBUGGING WAS DONE HERE.  */
function removeItem (itemArray)
{
  var toContinueProgram = true;
  var removeThisItem = prompt("Enter the name of the item you would like to remove. Enter -1 to exit the program.");
  if (removeThisItem !== -1) 
  {
    var found = false;
    /* *** For some reason, when I did: for (var i = 0; i < itemArray.length; i++) I got an error that the .length property is undefined
           then, after I reimplemented it after some time, it said that removeItem() is not an array at around line 198. *** */
	  for (var key in itemArray)  
    {
      if (itemArray[key].name === removeThisItem)
      {
        found = true;
      	if (itemArray[key].count == 1) 
			  { 
				  alert("Removed " + itemArray[key].name + " from your cart!"); itemArray.splice(key, 1); 
			  }
      	else 
      	{ 
        	var removeInstances = prompt("Enter 1 to remove one count of this item or 2 to remove all counts of this item completely.");
        	switch(removeInstances)
        	{
          		case "1":
            			itemArray[key].count--;
            			alert("Decreased the quantity of " + itemArray[key].name + " by one.");
       						break;
     					case "2":
                  alert("Removed all " + itemArray[key].name + "s" + " from your cart!");
            			itemArray.splice(key, 1);
            			break;
          		default:
						      alert("Invalid input detected!");
            			toContinueProgram = false;
            			break;
        	}
        }
        // Making sure not proceed with the code outside the for loop. We could have used break; to get out of the loop
        return toContinueProgram;	
      }  
    } 
    // Outside the for loop
	  // If unable to match what the user inputted with the array of items in the cart, call this function again until they get it right
    removeItem(dynamicCart);
  }
  else 
  { 
    toContinueProgram = false; return toContinueProgram;
  }
}


/* Handles the call upon removeItem(). Until the user inputs No or -1, continuously calls removeItem(). */
function dRemoveItems ()  
{
  var toContinueProgram = true;
  var whileCondition = true;
  
  // Iteration of nested function depends on its returned value.
  function dRemoveEm()  
  {
    var feedWhile = true;
    var removeByName = prompt("Would you like to remove an item by name (y/n)? Enter -1 to exit the program.");
    if (removeByName === "y" || removeByName === "Y") 
    { 
      var itemToRemove = removeItem(dynamicCart);
      if (itemToRemove == false)
      {
        // If the user inputs -1 when removeItem() tells them to enter a name, end this loop and transition 
        // back to Brain().
        toContinueProgram = false; feedWhile = false;     
      }
    }
    else if (removeByName === "n" || removeByName === "N") { feedWhile = false;}
    else if (removeByName === "-1") { toContinueProgram = false; feedWhile = false;}
    return feedWhile;
  }
  while (whileCondition)
  {
    // The loop
    whileCondition = dRemoveEm();   
  }
  return toContinueProgram;
}


/* Returns unique item data (including count) and returns a total cost (w/ tax) that will be stored
   externally to calculate the total cost of all items. */
function uniquePriceCountTotal (item) 
{
  var name = item.name;
  var price = item.price;
  var count = item.count;
  var subtotal = parseFloat(price * count);
  var total = parseFloat(subtotal * .075 + subtotal); // 100 * 7.5% = 7.5 +
  alert(name + ": $" + price + " x " + count + " = " + total + " (@7.5% tax)");
  return total;
}
// Written By Austin Copeland