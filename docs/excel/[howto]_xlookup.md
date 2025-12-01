# How to use XLOOKUP 

[Excel 365 / Excel 2021+ :material-microsoft-excel:](#){ .md-tag }

`XLOOKUP` is a modern replacement for older lookup functions like `VLOOKUP` and `HLOOKUP`. It searches a range or array, finds the right value, and returns the corresponding result. 

Unlike `VLOOKUP`, it can look both vertically and horizontally, supports exact matches by default, and handles missing values gracefully.

---

## to prepare data

Before using `XLOOKUP`, structure your worksheet properly:

- Organize data in a clear tabular format.  
- Ensure each column has a distinct header.  
- Avoid blank rows or merged cells within the table.  
- Keep `lookup_array` and `return_array` aligned in length.  
- Use consistent data types in the lookup column (e.g., all text or all numbers).  
- Remove leading/trailing spaces from text values to prevent mismatches.  
- Verify that the lookup column contains unique identifiers when possible to avoid ambiguous results.

!!! note annotate "Sample data"

    |Row| OrderID | Region   | Product   | Category   | Sales | Quantity | Date       |
    |---|---------|----------|-----------|------------|-------|----------|------------|
    | 2 | 1001    | North    | Laptop    | Electronics| 1200  | 2        | 2025-01-05 |
    | 3 | 1002    | South    | Phone     | Electronics| 800   | 5        | 2025-01-07 |
    | 4 | 1003    | East     | Desk      | Furniture  | 300   | 1        | 2025-01-10 |
    | 5 | 1004    | East     | Desk (L)  | Furniture  | 500   | 1        | 2025-01-09 |
    | 6 | 1005    | East     | Desk (XL) | Furniture  | 800   | 4        | 2025-01-11 |


---
## to understand the formula
### for syntax

!!! code annotate "Formula"
    ```text
    = XLOOKUP(lookup_value (1), lookup_array (2), return_array (3), [if_not_found] (4), [match_mode] (5), [search_mode] (6))
    ```

1.  [Required](#){ .md-tag }
   
    The value you want to find in the `lookup_array`. It can be text, a number, or a date. 

    Example: Find value of `Quantity` for value `Laptop` in `Product` column. 

    ```sh 
    = XLOOKUP("Laptop",....)
    ```

    Here `lookup_value` is `Laptop`.

2.  [Required](#){ .md-tag }
   
    The one-dimensional range where the `lookup_value` is searched. Must align in size with `return_array`.

    Example: Find value of `Quantity` for value `Laptop` in `Product` column. 

    ```sh 
    = XLOOKUP("Laptop", C2:C6, ...)
    ```

    Here `lookup_array` is `[Laptop, Phone, Desk]` from column `Product`:

    | Product   |
    |-----------|
    | Laptop    |
    | Phone     |
    | Desk      |
    | Desk (L)  |
    | Desk (XL) |
    
3.  [Required](#){ .md-tag }
   
    The one-dimensional range from which the result is returned. Must be the same length as `lookup_array`.

    Example: Find value of `Quantity` for value `Laptop` in `Product` column. 

    ```sh 
    = XLOOKUP("Laptop", C2:C6, D2:D6)
    ```

    Here `return_array` is `[2, 5, 1, 1, 4]` from column `Quantity`:

    | Quantity |
    |----------|
    | 2        |
    | 5        |
    | 1        |
    | 1        |
    | 4        |
   
4.  [Optional](#){ .md-tag }  
    Value returned if no match is found. If omitted, `#N/A` is returned.  
    Example:  
    ```sh
    = XLOOKUP("Tablet", C2:C6, D2:D6, "Not Found")
    ```

5.  [Optional](#){ .md-tag }  
    Match behavior.  
    - `0` = exact match (default)  
    - `-1` = exact or next smaller  
    - `1` = exact or next larger  
    - `2` = wildcard match (`*`, `?`)  
  
    !!! tip "Wild card character" 
        - `*` matches any sequence of characters.  
  
        Example: `"Lap*"` matches `"Laptop"`, `"Lapdesk"`.  

        - `?` matches any single character.  
  
        Example: `"Ph?ne"` matches `"Phone"`, `"Ph1ne"`.


    Example:  
    ```sh
    = XLOOKUP("Lap*", C2:C6, D2:D6, , 2)
    ```

6.  [Optional](#){ .md-tag }  
    Search direction.  
    - `1` = search first-to-last (default)  
    - `-1` = search last-to-first  
    - `2` = binary search ascending  
    - `-2` = binary search descending  
    Example:  
    ```sh
    = XLOOKUP("Laptop", C2:C56, D2:D6, , , -1)
    ```

!!! important
    - Always specify `lookup_array` and `return_array` with ranges of equal length.  
    - Use square brackets `[ ]` to denote optional arguments; they can be omitted if not needed.  
    - Place commas `,` between arguments even when skipping optional ones.  
  
      Example:  
      ```sh
      = XLOOKUP("Laptop", C2:C56, D2:D6, , 2)
      ```

      Here `if_not_found` is skipped, but commas are retained to ensure `match_mode` is set as `2`.


### for example

#### to find Sales by OrderID

Find the `Sales` value for `OrderID 1002`. 

| Row | OrderID | Region | Product   | Category    | Sales   | Quantity | Date       |
|-----|---------|--------|-----------|-------------|---------|----------|------------|
| 2   | 1001    | North  | Laptop    | Electronics | 1200    | 2        | 2025-01-05 |
| 3   | ==1002==| South  | Phone     | Electronics | ==800== | 5        | 2025-01-07 |
| 4   | 1003    | East   | Desk      | Furniture   | 300     | 1        | 2025-01-10 |
| 5   | 1004    | East   | Desk (L)  | Furniture   | 500     | 1        | 2025-01-09 |
| 6   | 1005    | East   | Desk (XL) | Furniture   | 800     | 4        | 2025-01-11 |


!!! code annotate "Formula"
    ```text
    = XLOOKUP(1002 (1), A2:A6 (2), E2:E6 (3), "Not Found" (4))
    ```

1.  [Required](#){ .md-tag }  
  `lookup_value`: The value to search for. Here it is `1002`, representing the `OrderID`.

2.  [Required](#){ .md-tag }  
  `lookup_array`: The range containing the lookup values. Here it is the `OrderID` column or `A2:A6`.

3.  [Required](#){ .md-tag }  
  `return_array`: The range containing the results to return. Here it is the `Sales` column or `E2:E6`.

4.  [Optional](#){ .md-tag }  
  `if_not_found`: The value returned if no match is found (`"Not Found"`).  

The formula searches `A2:A4` for `1002` and returns `800` from `E2:E6`.

#### to find Category by Product

Find the `Category` value for all `Product` has the term `Des`. 

| Row | OrderID | Region | Product       | Category      | Sales | Quantity | Date       |
|-----|---------|--------|---------------|---------------|-------|----------|------------|
| 2   | 1001    | North  | Laptop        | Electronics   | 1200  | 2        | 2025-01-05 |
| 3   | 1002    | South  | Phone         | Electronics   | 800   | 5        | 2025-01-07 |
| 4   | 1003    | East   | ==Desk==      | ==Furniture== | 300   | 1        | 2025-01-10 |
| 5   | 1004    | East   | ==Desk (L)==  | ==Furniture== | 500   | 1        | 2025-01-09 |
| 6   | 1005    | East   | ==Desk (XL)== | ==Furniture== | 800   | 4        | 2025-01-11 |

!!! code annotate "Formula"
    ```text
    = XLOOKUP("Desk*"(1), C2:C6 (2), D2:D6 (3), "Not Found" (4), 2 (5))
    ```

1.  [Required](#){ .md-tag }  
    `lookup_value`: The value to search for. Here it is `"Desk*"`, a wildcard pattern that matches any product beginning with `"Desk"` (e.g., `"Desk"`, `"Desk (L)"`, `"Desk (XL)"`).

2.  [Required](#){ .md-tag }  
    `lookup_array`: The range containing the lookup values. Here it is the `Product` column or `C2:C6`.

    | Product   |
    |-----------|
    | Laptop    |
    | Phone     |
    | Desk      |
    | Desk (L)  |
    | Desk (XL) |

3.  [Required](#){ .md-tag }  
    `return_array`: The range containing the results to return. Here it is the `Category` column or `D2:D6`.

    | Category    |
    |-------------|
    | Electronics |
    | Electronics |
    | Furniture   |
    | Furniture   |
    | Furniture   |

4.  [Optional](#){ .md-tag }  
     `if_not_found`: The value returned if no match is found (`"Not Found"`).  

5.  [Optional](#){ .md-tag }  
    `match_mode`: Controls how matching is performed. Here `2` enables wildcard matching (`*` for multiple characters, `?` for a single character).  

The formula searches `C2:C6` for any product beginning with `"Desk"` and returns `"Furniture"` from `D2:D6`.



